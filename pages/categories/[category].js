import Base from "@layouts/Baseof";
import Posts from "@partials/Posts";
import { fetchPosts, fetchCategories } from "@lib/api";
import { humanize } from "@lib/utils/textConverter";

const Category = ({ category, posts }) => {
  return (
    <Base title={`${humanize(category)} — BarkButler Blog`}>
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container px-4 py-8 md:py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Category
          </p>
          <h1 className="text-2xl sm:text-h2-sm md:text-h2 font-bold text-dark dark:text-gray-100">
            {humanize(category)}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>

      <section className="py-8 md:py-14">
        <div className="container px-4">
          {posts.length > 0 ? (
            <Posts posts={posts} />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </Base>
  );
};

export default Category;

export const getStaticPaths = async () => {
  try {
    const categories = await fetchCategories();
    return {
      paths: categories.map((cat) => ({ params: { category: cat.toLowerCase().replace(/\s+/g, "-") } })),
      fallback: "blocking",
    };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps = async ({ params }) => {
  const { category } = params;
  try {
    const data = await fetchPosts({ category, limit: 100 });
    return {
      props: { category, posts: data.posts || [] },
      revalidate: 300,
    };
  } catch {
    return { props: { category, posts: [] }, revalidate: 60 };
  }
};
