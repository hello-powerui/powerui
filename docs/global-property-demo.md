# Global Property Demo - categoryAxis

## Issue Description
The categoryAxis properties weren't showing when selected in the GlobalPropertySelector.

## Root Cause
The issue was in the SchemaForm component. When handling non-state-driven arrays (like categoryAxis), it was passing `schema.items` directly to a recursive SchemaForm call, which lost the array context and failed to render the properties correctly.

## Solution
Updated the SchemaForm component to properly render non-state-driven array properties by:
1. Extracting the properties from `schema.items.properties`
2. Rendering each property individually with proper change handlers
3. Maintaining the array structure by wrapping the updated value in an array

## Code Changes

### Before (line 1059-1071):
```typescript
return (
  <SchemaForm
    schema={schema.items}
    value={itemValue}
    onChange={(newItemValue) => handleChange([newItemValue])}
    schemaLoader={schemaLoader}
    path={path}
    level={level}
    hideTitle={hideTitle}
  />
);
```

### After:
```typescript
return (
  <div className="space-y-4">
    {!hideTitle && schema.title && (
      <h4 className="text-sm font-medium text-gray-700">{schema.title}</h4>
    )}
    {schema.description && (
      <p className="text-xs text-gray-500">{schema.description}</p>
    )}
    
    {/* Render the properties from the items schema */}
    <div className="space-y-4">
      {Object.entries(schema.items.properties || {}).map(([propName, propSchema]) => {
        return (
          <SchemaForm
            key={propName}
            schema={{ ...propSchema, title: contextualTitle }}
            value={itemValue[propName]}
            onChange={(newValue) => {
              const newItemValue = { ...itemValue, [propName]: newValue };
              handleChange([newItemValue]);
            }}
            schemaLoader={schemaLoader}
            path={[...path, '0', propName]}
            level={level + 1}
            hideTitle={false}
          />
        );
      })}
    </div>
  </div>
);
```

## Testing
The categoryAxis property has 36 sub-properties including:
- axisStyle
- axisType
- bold
- fontFamily
- fontSize
- gridlineColor
- labelColor
- show
- titleText
- And many more...

These properties should now be visible and editable when categoryAxis is selected as a global property.