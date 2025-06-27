import { PropertyCategory } from '../types/schema.types.js';
import crypto from 'crypto';

export function categorizeProperty(name: string, path: string): PropertyCategory {
  const lowerName = name.toLowerCase();
  const lowerPath = path.toLowerCase();

  // Color-related
  if (/color|fill|background|foreground|accent/.test(lowerPath)) {
    return PropertyCategory.Color;
  }

  // Typography
  if (/font|text|type|weight|italic|underline/.test(lowerPath)) {
    return PropertyCategory.Typography;
  }

  // Spacing
  if (/padding|margin|spacing|gap/.test(lowerPath)) {
    return PropertyCategory.Spacing;
  }

  // Border
  if (/border|stroke|outline/.test(lowerPath)) {
    return PropertyCategory.Border;
  }

  // Layout
  if (/layout|position|alignment|width|height|size/.test(lowerPath)) {
    return PropertyCategory.Layout;
  }

  // Data
  if (/data|value|category|measure|axis/.test(lowerPath)) {
    return PropertyCategory.Data;
  }

  // Interaction
  if (/hover|click|select|tooltip|zoom|drill/.test(lowerPath)) {
    return PropertyCategory.Interaction;
  }

  // Visual
  if (/visual|header|title|legend|label/.test(lowerPath)) {
    return PropertyCategory.Visual;
  }

  // Effect
  if (/shadow|glow|transparency|opacity|blur/.test(lowerPath)) {
    return PropertyCategory.Effect;
  }

  return PropertyCategory.Other;
}

export function generatePropertyId(path: string): string {
  // Create a stable, unique ID from the property path
  const hash = crypto.createHash('sha256').update(path).digest('hex');
  return hash.substring(0, 12);
}

export function formatPropertyName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim();
}

export function getPropertyDepth(path: string): number {
  return path.split('.').length - 1;
}

export function extractPropertyName(path: string): string {
  const parts = path.split('.');
  return parts[parts.length - 1];
}

export function isColorProperty(prop: any): boolean {
  const name = prop.title?.toLowerCase() || '';
  const path = prop.path?.toLowerCase() || '';
  
  return /color|fill|background|foreground|accent/.test(name) ||
         /color|fill|background|foreground|accent/.test(path) ||
         prop.$ref === '#/definitions/color' ||
         prop.$ref === '#/definitions/fill';
}

export function isNumericProperty(prop: any): boolean {
  return prop.type === 'number' || 
         prop.type === 'integer' ||
         (Array.isArray(prop.type) && (prop.type.includes('number') || prop.type.includes('integer')));
}

export function normalizePropertyType(type: string | string[] | undefined): string {
  if (!type) return 'unknown';
  if (Array.isArray(type)) return type[0];
  return type;
}

export function groupPropertiesByPattern(properties: Map<string, any>): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  
  const patterns = {
    'font': /font|text/i,
    'color': /color|fill|background/i,
    'spacing': /padding|margin|spacing/i,
    'border': /border|stroke|outline/i,
    'size': /size|width|height|radius/i,
    'position': /position|alignment|vertical|horizontal/i,
    'data': /data|value|category|measure/i,
    'interaction': /hover|select|click|tooltip/i
  };

  properties.forEach((prop, id) => {
    for (const [groupName, pattern] of Object.entries(patterns)) {
      if (pattern.test(prop.path || '') || pattern.test(prop.title || '')) {
        if (!groups.has(groupName)) {
          groups.set(groupName, []);
        }
        groups.get(groupName)!.push(id);
        break; // Only add to first matching group
      }
    }
  });

  return groups;
}

export function findRelatedProperties(
  propertyId: string, 
  properties: Map<string, any>, 
  maxResults: number = 5
): string[] {
  const targetProp = properties.get(propertyId);
  if (!targetProp) return [];

  const related: Array<{ id: string; score: number }> = [];

  properties.forEach((prop, id) => {
    if (id === propertyId) return;

    let score = 0;

    // Same category
    if (prop.category === targetProp.category) score += 3;

    // Similar path structure
    const targetParts = targetProp.path.split('.');
    const propParts = prop.path.split('.');
    const commonParts = targetParts.filter((part: string, i: number) => propParts[i] === part).length;
    score += commonParts;

    // Similar name
    if (prop.title.toLowerCase().includes(targetProp.title.toLowerCase()) ||
        targetProp.title.toLowerCase().includes(prop.title.toLowerCase())) {
      score += 2;
    }

    // Same type
    if (prop.type === targetProp.type) score += 1;

    // Common visuals
    const commonVisuals = targetProp.visuals.filter((v: string) => prop.visuals.includes(v)).length;
    score += commonVisuals * 0.5;

    if (score > 0) {
      related.push({ id, score });
    }
  });

  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(r => r.id);
}