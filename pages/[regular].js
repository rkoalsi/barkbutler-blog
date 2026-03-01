import Base from "@layouts/Baseof";
import NotFound from "@layouts/404";
import PostSingle from "@layouts/PostSingle";
import { fetchPost } from "@lib/api";

const RegularPages = ({ type, post }) => {
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

  return (
    <Base>
      <NotFound data={{ frontmatter: { title: "Not Found" }, content: "" }} />
    </Base>
  );
};

export default RegularPages;

export const getServerSideProps = async ({ params }) => {
  const { regular } = params;

  try {
    const post = await fetchPost(regular);
    if (post) {
      return { props: { type: "post", post, slug: regular } };
    }
  } catch (err) {
    // not found or API error
  }

  return { props: { type: "notfound", slug: regular } };
};
