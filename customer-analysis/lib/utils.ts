import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import * as fs from 'fs';
import * as path from 'path';

export function readCSV<T = any>(filePath: string): T[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    cast: (value, context) => {
      if (context.header) return value;
      
      // Try to parse numbers
      const num = Number(value);
      if (!isNaN(num) && value !== '') return num;
      
      // Parse booleans
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
      
      return value;
    }
  });
}

export function writeCSV(filePath: string, data: any[], columns?: string[]) {
  const csv = stringify(data, {
    header: true,
    columns: columns
  });
  fs.writeFileSync(filePath, csv);
}

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function parseDate(dateStr: string): Date {
  // Handle various date formats
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date: ${dateStr}`);
    return new Date();
  }
  return date;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function getOutputPath(filename: string): string {
  return path.join(__dirname, '..', 'output', filename);
}

export function ensureOutputDir() {
  const outputDir = path.join(__dirname, '..', 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
}

export function loadEnv() {
  // Load environment variables from parent project
  const envPath = path.join(__dirname, '..', '..', '.env');
  const envLocalPath = path.join(__dirname, '..', '..', '.env.local');
  
  if (fs.existsSync(envLocalPath)) {
    require('dotenv').config({ path: envLocalPath });
  } else if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
  } else {
    console.warn('No .env or .env.local file found in parent project. Make sure STRIPE_SECRET_KEY is set.');
  }
}

export function extractPlanFromVariant(variant: string): string {
  // Extract plan type from variant strings like "(Individual (Single License))"
  if (variant.includes('Business') || variant.includes('Unlimited')) {
    return 'Business';
  } else if (variant.includes('Team')) {
    const match = variant.match(/Team\s*\((\d+)/);
    if (match) {
      return `Team ${match[1]}`;
    }
    return 'Team';
  } else if (variant.includes('Individual') || variant.includes('Single')) {
    return 'Pro';
  }
  return 'Unknown';
}

export function safeParseFloat(value: any): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[$,]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}