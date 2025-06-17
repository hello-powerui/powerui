import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { services } from '@/lib/services';
import { AppError, AuthenticationError, ValidationError } from '@/lib/errors';
import { z } from 'zod';

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  details?: any;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Response helpers
export function apiSuccess<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ data }, { status });
}

export function apiError(
  message: string,
  status = 500,
  details?: any
): NextResponse<ApiResponse> {
  return NextResponse.json({ error: message, details }, { status });
}

export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('[API Error]', error);

  if (error instanceof AppError) {
    return apiError(error.message, error.statusCode, error.context);
  }

  if (error instanceof z.ZodError) {
    return apiError('Validation failed', 400, error.errors);
  }

  if (error instanceof Error) {
    // Prisma unique constraint violation
    if ('code' in error && error.code === 'P2002') {
      return apiError('Resource already exists', 409);
    }

    return apiError(error.message, 500);
  }

  return apiError('An unexpected error occurred', 500);
}

// Authentication middleware
export interface AuthenticatedRequest extends NextRequest {
  userId: string;
  dbUserId: string;
}

export function withAuth<T = any>(
  handler: (req: NextRequest, context: { userId: string; dbUserId: string }) => Promise<NextResponse<T>>
) {
  return async (req: NextRequest): Promise<NextResponse<T | ApiResponse>> => {
    try {
      console.log('[withAuth] Starting authentication check');
      const { userId } = await auth();
      console.log('[withAuth] Clerk userId:', userId);
      
      if (!userId) {
        console.log('[withAuth] No userId found, returning 401');
        return apiError('Authentication required', 401);
      }

      console.log('[withAuth] Ensuring user exists in database');
      const dbUserId = await services.user.ensureUserExists(userId);
      console.log('[withAuth] Database userId:', dbUserId);
      
      return handler(req, { userId, dbUserId });
    } catch (error) {
      console.error('[withAuth] Error:', error);
      if (error instanceof AuthenticationError) {
        return apiError(error.message, 401);
      }
      return handleApiError(error);
    }
  };
}

// Paid user middleware
export function withPaidUser<T = any>(
  handler: (req: NextRequest, context: { userId: string; dbUserId: string }) => Promise<NextResponse<T>>
) {
  return withAuth(async (req, context) => {
    try {
      console.log('[withPaidUser] Checking paid user status for:', context.dbUserId);
      const user = await services.user.getUserById(context.dbUserId);
      
      console.log('[withPaidUser] User check:', { 
        dbUserId: context.dbUserId, 
        userFound: !!user, 
        userPlan: user?.plan 
      });
      
      if (!user || !['PRO', 'TEAM'].includes(user.plan)) {
        console.log('[withPaidUser] User does not have paid plan, returning 403');
        return apiError('Pro or Team plan required', 403);
      }

      console.log('[withPaidUser] User has valid plan, proceeding to handler');
      return handler(req, context);
    } catch (error) {
      console.error('[withPaidUser] Error:', error);
      return handleApiError(error);
    }
  });
}

// Request validation middleware
export function withValidation<T extends z.ZodSchema>(
  schema: T,
  handler: (
    req: NextRequest,
    data: z.infer<T>,
    context: any
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: any): Promise<NextResponse> => {
    try {
      const body = await req.json();
      const validated = schema.parse(body);
      return handler(req, validated, context);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return apiError('Invalid request data', 400, error.errors);
      }
      return handleApiError(error);
    }
  };
}

// Rate limiting helper (basic implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export async function withRateLimit(
  handler: (req: NextRequest, context: any) => Promise<NextResponse>,
  options: { requests: number; windowMs: number } = { requests: 60, windowMs: 60000 }
) {
  return async (req: NextRequest, context: any): Promise<NextResponse> => {
    const identifier = context.userId || req.ip || 'anonymous';
    const now = Date.now();
    
    const record = requestCounts.get(identifier);
    
    if (!record || now > record.resetTime) {
      requestCounts.set(identifier, {
        count: 1,
        resetTime: now + options.windowMs,
      });
    } else if (record.count >= options.requests) {
      return apiError('Too many requests', 429, {
        retryAfter: Math.ceil((record.resetTime - now) / 1000),
      });
    } else {
      record.count++;
    }

    return handler(req, context);
  };
}

// Compose middlewares
export function composeMiddleware(
  ...middlewares: Array<(handler: any) => any>
) {
  return (handler: any) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}