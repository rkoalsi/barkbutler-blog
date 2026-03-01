import Base from "@layouts/Baseof";
import Posts from "@partials/Posts";
import { fetchPosts, fetchTags } from "@lib/api";
import { humanize } from "@lib/utils/textConverter";

const Tag = ({ tag, posts }) => {
  return (
    <Base title={`#${humanize(tag)} — BarkButler Blog`}>
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container px-4 py-8 md:py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Tag
          </p>
          <h1 className="text-2xl sm:text-h2-sm md:text-h2 font-bold text-dark dark:text-gray-100">
            #{humanize(tag)}
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
              <p className="text-gray-400 dark:text-gray-600">No posts with this tag yet.</p>
            </div>
          )}
        </div>
      </section>
    </Base>
  );
};

export default Tag;

export const getStaticPaths = async () => {
  try {
    const tags = await fetchTags();
    return {
      paths: tags.map((tag) => ({
        params: { tag: tag.toLowerCase().replace(/\s+/g, "-") },
      })),
      fallback: "blocking",
    };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps = async ({ params }) => {
  const { tag } = params;
  try {
    const data = await fetchPosts({ tag, limit: 100 });
    return {
      props: { tag, posts: data.posts || [] },
      revalidate: 300,
    };
  } catch {
    return { props: { tag, posts: [] }, revalidate: 60 };
  }
};
