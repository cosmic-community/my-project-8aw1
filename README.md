# My Project

![App Preview](https://imgix.cosmicjs.com/82c4a060-4f9d-11f1-8004-49554e815733-autopilot-photo-1423666639041-f56000c27a9a-1778767334751.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, beautiful content-driven website built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 📝 Dynamic blog posts with rich content
- 👤 Author profiles with bios and social links
- 🏷️ Color-coded category system
- 📄 Custom pages with SEO metadata
- 🎨 Modern responsive design
- ⚡ Server-side rendering for fast performance
- 🖼️ Optimized images via imgix

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a05d59fb4bc78a77bbdb9e3&clone_repository=6a05d67cb4bc78a77bbdba20)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: I will import from another Cosmic account. Do anything, create anything."

### Code Generation Prompt

> Build a Next.js application for a website called "My Project". The content is managed in Cosmic CMS with the following object types: authors, categories, posts, pages. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic SDK
- imgix for image optimization

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all posts with author and categories
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with [Cosmic](https://www.cosmicjs.com/docs) to dynamically render content from your bucket. All content types (posts, authors, categories, pages) are fetched server-side for optimal performance.

## Deployment Options

Deploy to Vercel, Netlify, or any platform supporting Next.js. Set environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->