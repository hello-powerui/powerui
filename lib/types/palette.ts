export interface ColorPalette {
  id: string;
  name: string;
  description?: string | null;
  colors: string[];
  isBuiltIn?: boolean;
  userId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NeutralPalette {
  id: string;
  name: string;
  shades: Record<string, string>;
  isBuiltIn?: boolean;
  userId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}