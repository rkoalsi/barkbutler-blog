import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";

const notFound = () => {
  return (
    <Base>
      <NotFound data={{ frontmatter: { title: "Page Not Found" }, content: "" }} />
    </Base>
  );
};

export default notFound;
