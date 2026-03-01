# BarkButler Blog — Project Memory

## Architecture
- **Blog site**: Next.js 12 + Tailwind CSS at `/barkbutler/barkbutler-blog`
- **Backend API**: FastAPI + MongoDB at `/order_form_backend` (public: `/api/blog/*`, admin: `/api/admin/blog/*`)
- **Admin frontend**: Next.js 15 + MUI at `/order_form_frontend`

## Backend Integration (done)
- Public endpoints: `GET /api/blog/posts`, `GET /api/blog/posts/{slug}`, `GET /api/blog/categories`, `GET /api/blog/tags`
- Admin endpoints (JWT auth): `GET/POST /api/admin/blog/posts`, `PUT/DELETE /api/admin/blog/posts/{id}`, `POST /api/admin/blog/posts/upload-image`
- MongoDB collection: `blog_posts`
- Migration: run `python -m db.migrate_blog_posts` from `order_form_backend/`
- Permission seeding: run `python -m db.seed_blog_permission` from `order_form_backend/`

## Blog Site Data Flow
- All pages use `getServerSideProps` (SSR) or ISR to fetch from the backend API
- API client: `lib/api.js` uses `API_URL` (server) / `NEXT_PUBLIC_API_URL` (client) env vars
- `.env.local` must have `API_URL` and `NEXT_PUBLIC_API_URL` pointing to backend
- Blog post data format: flat object (not `frontmatter`-nested), content is HTML string
- Blog posts no longer read from markdown — all data comes from MongoDB

## UI Design
- Light gray page bg (`bg-gray-50`), white cards, yellow footer (`bg-custom_yellow`)
- Primary color: `#AE6BF9` (purple) used for badges, links, accents
- Post cards: `FeaturedPostCard` (full-width hero) + `PostCard` (2-col grid)
- PostSingle: breadcrumb, title, meta, hero image, HTML content via `dangerouslySetInnerHTML`

## Admin Frontend (blog_posts.tsx)
- Location: `order_form_frontend/pages/admin/blog_posts.tsx`
- Features: table with search, add/edit dialog with ReactQuill, image upload to S3, draft toggle, delete
- Route accessible to `admin` and `sales_admin` roles via permissions collection
- Article icon is in AdminLayout.tsx iconMap

## Known Fixes Applied
- `base.scss`: changed `text-white` → `text-dark` on body/headings (new light theme)
- `components.scss`: social icons updated to dark colors for yellow footer
- Images: all use `layout="responsive"` with explicit width/height (not `layout="fill"`)
- Admin `blog_posts.tsx`: removed duplicate quill CSS import (already in `_app.tsx`); Dialog uses `sx={{ overflowY: 'auto', maxHeight: '80vh' }}` not `scroll="paper"` to allow Quill to function
- Mobile: all pages use `px-4` on container, responsive text sizes (`text-2xl sm:text-h2-sm md:text-h2`)
- ReactQuill content loading: `key={dialogOpen ? (selectedPost?._id || 'new') : 'closed'}` forces re-mount on open
- ReactQuill inline image: custom `imageHandler` via `useCallback` + hidden file input + `quillRef.getEditor().insertEmbed`; `quillModules` inside component via `useMemo` with `toolbar.handlers`
- S3 env vars in `admin_blog_posts.py`: uses `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_REGION`, `S3_BUCKET_NAME`, `S3_URL` (not `AWS_*`)
- Content/images script: `db/upload_and_update_blog.py` — uploads images → S3, fixes markdown-in-HTML, replaces local paths, upserts to MongoDB; run: `python -m db.upload_and_update_blog`

## Tailwind Custom Colors (from theme.json)
- `primary`: `#9da5fd` | `secondary`: `#AE6BF9` | `custom_yellow`: `#FFDA34` | `dark`: `#152035`

## Dark Mode
- `tailwind.config.js`: `darkMode: "class"` enabled
- `context/ThemeContext.js`: `ThemeProvider` + `useTheme()` hook; persists to `localStorage`
- `_app.js`: FOUC-prevention inline script sets `dark` class on `<html>` before paint; wrapped with `<ThemeProvider>`
- `Baseof.js`: syncs `isDark` → `document.documentElement.classList` via `useEffect`
- `Header.js`: moon/sun toggle button uses `useTheme()`; dark bg: `dark:bg-gray-950`
- Cards/posts use `dark:bg-gray-900 dark:ring-1 dark:ring-gray-800` (ring replaces shadow)
- PostSingle prose uses `dark:prose-invert` for article content
- Footer: `dark:bg-gray-900 dark:border-t dark:border-gray-800` (replaces yellow in dark)
- All page headers: `dark:bg-gray-950 dark:border-gray-800`
- container max-width bumped from 1000px → 1100px in components.scss
