import Base from "@layouts/Baseof";
import { fetchCategories } from "@lib/api";
import { humanize } from "@lib/utils/textConverter";
import Link from "next/link";

const Categories = ({ categories }) => {
  return (
    <Base title="Categories — BarkButler Blog">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container px-4 py-8 md:py-10 text-center">
          <h1 className="text-2xl sm:text-h2-sm md:text-h2 font-bold text-dark dark:text-gray-100">
            Categories
          </h1>
        </div>
      </div>

      <section className="py-8 md:py-16">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, i) => (
              <Link
                key={i}
                href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                passHref
              >
                <a className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:bg-primary hover:text-white hover:border-primary dark:hover:border-primary transition-colors shadow-sm dark:shadow-none">
                  {humanize(category)}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Categories;

export const getStaticProps = async () => {
  try {
    const categories = await fetchCategories();
    return { props: { categories }, revalidate: 300 };
  } catch {
    return { props: { categories: [] }, revalidate: 60 };
  }
};
