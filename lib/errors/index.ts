export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Not authenticated', context?: Record<string, unknown>) {
    super(message, 'AUTH_REQUIRED', 401, context);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Not authorized', context?: Record<string, unknown>) {
    super(message, 'AUTH_FORBIDDEN', 403, context);
  }
}

export class SubscriptionRequiredError extends AppError {
  constructor(message = 'Active subscription required', context?: Record<string, unknown>) {
    super(message, 'SUBSCRIPTION_REQUIRED', 402, { upgrade_url: '/upgrade', ...context });
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errors?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, { errors });
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    super(message, 'NOT_FOUND', 404, { resource, id });
  }
}

export class ConflictError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'CONFLICT', 409, context);
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Rate limit exceeded', context?: Record<string, unknown>) {
    super(message, 'RATE_LIMIT', 429, context);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function handleApiError(error: unknown) {
  if (isAppError(error)) {
    return new Response(
      JSON.stringify({
        error: error.message,
        code: error.code,
        ...error.context
      }),
      { 
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  console.error('Unexpected error:', error);
  
  return new Response(
    JSON.stringify({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }),
    { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}