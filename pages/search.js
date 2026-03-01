import Base from "@layouts/Baseof";
import Posts from "@layouts/partials/Posts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const router = useRouter();
  const { key } = router.query;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!key) return;

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

    setLoading(true);
    fetch(`${apiUrl}/blog/posts?search=${encodeURIComponent(key)}&limit=50`)
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [key]);

  return (
    <Base title={`Search: ${key || ""} — BarkButler Blog`}>
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container px-4 py-8 md:py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Search Results
          </p>
          <h1 className="text-2xl sm:text-h2-sm md:text-h2 font-bold text-dark dark:text-gray-100">
            {key ? (
              <>
                Results for{" "}
                <span className="text-primary">&ldquo;{key}&rdquo;</span>
              </>
            ) : (
              "Search"
            )}
          </h1>
        </div>
      </div>

      <section className="py-8 md:py-14">
        <div className="container px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length > 0 ? (
            <Posts posts={posts} />
          ) : key ? (
            <div className="text-center py-16">
              <p className="text-gray-400 dark:text-gray-600 text-lg">
                No posts found for &ldquo;{key}&rdquo;
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </Base>
  );
};

export default SearchPage;
