import Base from "@layouts/Baseof";
import NotFound from "@layouts/404";
import About from "@layouts/About";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import PostSingle from "@layouts/PostSingle";
import { fetchPost } from "@lib/api";
import { getRegularPage } from "@lib/contentParser";

// Handles both blog posts (from API) and regular markdown pages (about, contact, etc.)
const RegularPages = ({ type, post, data, slug }) => {
  if (type === "post" && post) {
    return (
      <Base
        title={post.title}
        description={post.description}
        image={post.image}
      >
        <PostSingle post={post} />
      </Base>
    );
  }

  if (!data) {
    return (
      <Base>
        <NotFound data={{ frontmatter: { title: "Not Found" }, content: "" }} />
      </Base>
    );
  }

  const { title, meta_title, description, image, noindex, canonical, layout } =
    data.frontmatter;
  const { content } = data;

  return (
    <Base
      title={title}
      description={description || content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      {layout === "404" ? (
        <NotFound data={data} />
      ) : layout === "about" ? (
        <About data={data} />
      ) : layout === "contact" ? (
        <Contact data={data} />
      ) : (
        <Default data={data} />
      )}
    </Base>
  );
};

export default RegularPages;

export const getServerSideProps = async ({ params }) => {
  const { regular } = params;

  // 1. Try to fetch as a blog post from the API
  try {
    const post = await fetchPost(regular);
    if (post) {
      return { props: { type: "post", post, slug: regular } };
    }
  } catch (err) {
    // Not found or API error — fall through to markdown pages
  }

  // 2. Fall back to regular markdown pages (about, contact, etc.)
  try {
    const data = await getRegularPage(regular);
    return { props: { type: "page", data, slug: regular } };
  } catch (err) {
    return { props: { type: "notfound", slug: regular } };
  }
};
