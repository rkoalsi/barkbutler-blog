import { dateFormat } from "@lib/utils/dateFormat";
import { slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const PostSingle = ({ post }) => {
  const {
    title,
    description,
    date,
    image,
    categories = [],
    tags = [],
    authors = [],
    time,
    content,
  } = post;

  return (
    <>
      {/* Post Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container px-4 py-6 md:py-10 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-4">
            <Link href="/" passHref>
              <a className="hover:text-primary transition-colors">Blog</a>
            </Link>
            {categories[0] && (
              <>
                <span>/</span>
                <Link href={`/categories/${slugify(categories[0])}`} passHref>
                  <a className="hover:text-primary transition-colors capitalize">
                    {categories[0]}
                  </a>
                </Link>
              </>
            )}
          </nav>

          {/* Category Badges */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat, i) => (
                <Link href={`/categories/${slugify(cat)}`} key={i} passHref>
                  <a className="inline-block px-3 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary text-xs font-semibold rounded-full uppercase tracking-wide hover:bg-primary hover:text-white transition-colors">
                    {cat}
                  </a>
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-xl sm:text-h3-sm md:text-h2 font-bold text-dark dark:text-gray-100 leading-tight mb-4">
            {title}
          </h1>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400 pb-5 border-b border-gray-100 dark:border-gray-800">
            {authors[0] && (
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {authors[0]}
              </span>
            )}
            {authors[0] && date && <span>·</span>}
            {date && <span>{dateFormat(date)}</span>}
            {time && (
              <>
                <span>·</span>
                <span>{time} read</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero image */}
      {image && (
        <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container max-w-4xl px-0 sm:px-4">
            <Image
              src={image}
              alt={title}
              width={1200}
              height={600}
              layout="responsive"
              objectFit="cover"
              priority
              className="sm:rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Article body */}
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container px-4 py-8 md:py-12 max-w-3xl">
          {/* Description / lead */}
          {description && (
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 md:mb-8 font-medium border-l-4 border-primary pl-4">
              {description}
            </p>
          )}

          {/* Content */}
          <div
            className="prose prose-base max-w-none dark:prose-invert
              prose-headings:text-dark dark:prose-headings:text-gray-100
              prose-headings:font-bold prose-headings:leading-tight
              prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-p:leading-relaxed prose-p:text-base
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-dark dark:prose-strong:text-gray-200
              prose-blockquote:border-primary prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
              prose-img:rounded-xl prose-img:shadow-sm prose-img:w-full
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-ol:text-gray-700 dark:prose-ol:text-gray-300
              prose-ul:text-gray-700 dark:prose-ul:text-gray-300
              prose-hr:border-gray-200 dark:prose-hr:border-gray-800"
            dangerouslySetInnerHTML={{ __html: content || "" }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <Link href={`/tags/${slugify(tag)}`} key={i} passHref>
                    <a className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                      #{tag}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-8">
            <Link href="/" passHref>
              <a className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.78 4.22a.75.75 0 010 1.06L7.06 8l2.72 2.72a.75.75 0 01-1.06 1.06L5.47 8.53a.75.75 0 010-1.06l3.25-3.25a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Blog
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostSingle;
