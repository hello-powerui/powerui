# Blog Management Guide

## How to Add a New Blog Post

1. Create a new `.md` file in the `/blogs` folder
2. Use a URL-friendly filename (e.g., `my-new-post.md`)
3. Add frontmatter at the top of the file:

```markdown
---
title: "Your Blog Post Title"
date: "2024-12-25"
author: "Author Name"
excerpt: "A brief description of your post (1-2 sentences)"
tags: ["tag1", "tag2", "tag3"]
---

# Your Blog Post Title

Your content goes here...
```

## Formatting Options

### Text Formatting
- **Bold text** with `**text**`
- *Italic text* with `*text*`
- ***Bold and italic*** with `***text***`

### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
```

### Links
```markdown
[Link text](https://example.com)
```

### Images
```markdown
![Alt text](https://example.com/image.jpg)
```

For local images:
1. Add images to `/public/blog-images/`
2. Reference as: `![Alt text](/blog-images/your-image.jpg)`

### Code
Inline code: `` `code` ``

Code blocks:
````markdown
```javascript
const example = "code block";
```
````

### Lists
```markdown
- Bullet point
- Another point
  - Nested point

1. Numbered list
2. Second item
```

## Managing Posts

### To Update a Post
Simply edit the `.md` file and save. The changes will be reflected immediately.

### To Remove a Post
Delete the `.md` file from the `/blogs` folder.

### To Change the URL
Rename the file (e.g., `old-name.md` → `new-name.md`)

## Best Practices

1. **Use descriptive filenames**: `power-bi-color-theory.md` instead of `post1.md`
2. **Always include frontmatter**: At minimum, include title and date
3. **Optimize images**: Use web-friendly formats (JPG, PNG, WebP)
4. **Keep excerpts concise**: 1-2 sentences that summarize the post
5. **Use relevant tags**: Help readers find related content

## Example Post

```markdown
---
title: "Getting Started with Power BI Themes"
date: "2024-12-25"
author: "Jane Doe"
excerpt: "Learn the basics of creating and applying custom themes in Power BI to enhance your reports."
tags: ["power-bi", "themes", "tutorial", "beginner"]
---

# Getting Started with Power BI Themes

Power BI themes are a powerful way to maintain consistency across your reports...

## Why Use Themes?

Themes help you:
- Maintain brand consistency
- Save time on formatting
- Ensure accessibility

![Theme example](/blog-images/theme-example.png)

## Creating Your First Theme

Here's a simple theme to get started:

```json
{
  "name": "My First Theme",
  "dataColors": ["#FF6B6B", "#4ECDC4", "#45B7D1"]
}
```

[Download the complete theme file](/downloads/my-first-theme.json)
```