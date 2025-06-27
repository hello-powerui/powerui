# Power BI Schema API (Experimental)

This is an experimental project to create a more efficient and AI-friendly API for accessing the Power BI theme schema.

## Problem Statement

The current `reportThemeSchema-2.143.json` file is:
- 1.1MB in size
- Contains 12,097 properties
- Has a maximum nesting depth of 17 levels
- Difficult to navigate programmatically
- Too complex for AI models to use effectively

## Solution

This experimental API provides:
1. Pre-processed and indexed schema data
2. Fast query capabilities
3. AI-friendly natural language interface
4. Optimized for common use cases

## Structure

```
experimental/schema-api/
├── src/
│   ├── processor/          # Schema processing pipeline
│   ├── api/               # Query API implementation
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── scripts/               # Build and processing scripts
├── data/                  # Processed schema data
└── examples/              # Usage examples
```

## Status

🚧 **EXPERIMENTAL** - This is a proof of concept and not ready for production use.