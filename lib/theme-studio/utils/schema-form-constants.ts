// Schema form constants and configuration

export const SPECIAL_PROPERTY_NAMES = {
  WILDCARD: '*',
  STATE_ID: '$id',
  SHOW: 'show',
} as const;

export const COMMON_REFS = {
  COMMON_CARDS: '#/definitions/commonCards',
  FILL: '#/definitions/fill',
  IMAGE: '#/definitions/image',
} as const;

export const ARRAY_INDICES = {
  FIRST: '0',
} as const;

export const VISUAL_CONTEXTS = {
  VISUAL_STYLES: 'visualStyles',
} as const;

export const STATE_VALUES = {
  DEFAULT: 'default',
} as const;

export const TAB_TYPES = {
  SPECIFIC: 'specific',
  GENERAL: 'general',
} as const;