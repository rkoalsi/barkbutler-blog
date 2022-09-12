import { markdownify } from "@lib/utils/textConverter";

const NotFound = ({ data }) => {
  const { frontmatter, content } = data;

  return (
    <section className="section">
      <div className="container">
        <div className="flex h-[40vh] items-center justify-center text-black">
          <div className="text-center">
            <h1 className="mb-4">{frontmatter.title}</h1>
            {markdownify(content, "div", "content prose-headings:text-black")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
