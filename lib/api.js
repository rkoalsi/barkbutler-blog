/**
 * API client for fetching blog data from the backend.
 * Server-side: uses API_URL (private env var)
 * Client-side: uses NEXT_PUBLIC_API_URL (public env var)
 */
const API_URL =
  (typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL) || "http://localhost:8000/api";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`API error ${res.status} fetching ${path}`);
  }
  return res.json();
}

/**
 * Fetch paginated list of published blog posts.
 */
export async function fetchPosts({
  page = 1,
  limit = 10,
  category,
  tag,
  search,
} = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category) params.append("category", category);
  if (tag) params.append("tag", tag);
  if (search) params.append("search", search);
  return apiFetch(`/blog/posts?${params}`);
}

/**
 * Fetch a single published post by slug.
 * Returns null if not found.
 */
export async function fetchPost(slug) {
  return apiFetch(`/blog/posts/${encodeURIComponent(slug)}`);
}

/**
 * Fetch all published post slugs (for static path generation).
 */
export async function fetchPostSlugs() {
  const data = await apiFetch("/blog/posts/slugs");
  return data?.slugs || [];
}

/**
 * Fetch all distinct categories.
 */
export async function fetchCategories() {
  const data = await apiFetch("/blog/categories");
  return data?.categories || [];
}

/**
 * Fetch all distinct tags.
 */
export async function fetchTags() {
  const data = await apiFetch("/blog/tags");
  return data?.tags || [];
}
