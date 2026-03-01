import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Posts from "@partials/Posts";
import { fetchPosts } from "@lib/api";

const { pagination } = config.settings;

const BlogPagination = ({ posts, currentPage, totalPages }) => {
  return (
    <Base>
      {/* Hero banner */}
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container py-10 md:py-16 text-center px-4">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full">
            The BarkButler Blog
          </span>
          <h1 className="text-2xl sm:text-h2-sm md:text-h2 font-bold text-dark dark:text-gray-100 mb-3 mt-2">
            Stories, tips &amp; guides
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            For pet parents who want the very best for their furry family.
          </p>
        </div>
      </div>

      <section className="py-8 md:py-14">
        <div className="container px-4">
          <Posts className="mb-8 md:mb-12" posts={posts} />
          <Pagination
            section=""
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

export const getServerSideProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);

  try {
    const data = await fetchPosts({ page: currentPage, limit: pagination });
    return {
      props: {
        posts: data.posts || [],
        totalPages: data.total_pages || 1,
        currentPage,
      },
    };
  } catch (err) {
    console.error("Failed to fetch posts:", err.message);
    return {
      props: { posts: [], totalPages: 1, currentPage },
    };
  }
};
