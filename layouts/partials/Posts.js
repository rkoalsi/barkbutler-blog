import { dateFormat } from "@lib/utils/dateFormat";
import { slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

const CategoryBadge = ({ category }) => (
  <Link href={`/categories/${slugify(category)}`} passHref>
    <a className="inline-block px-3 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary text-xs font-semibold rounded-full uppercase tracking-wide hover:bg-primary hover:text-white transition-colors">
      {category}
    </a>
  </Link>
);

const PostMeta = ({ post }) => (
  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 flex-wrap">
    {post.authors?.[0] && (
      <>
        <span className="font-medium text-gray-500 dark:text-gray-400">
          {post.authors[0]}
        </span>
        <span>·</span>
      </>
    )}
    <span>{dateFormat(post.date)}</span>
    {post.time && (
      <>
        <span>·</span>
        <span>{post.time}</span>
      </>
    )}
  </div>
);

/** Featured (first / hero) post card */
const FeaturedPostCard = ({ post }) => {
  const excerpt =
    post.description || stripHtml(post.content || "").slice(0, 220);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none dark:ring-1 dark:ring-gray-700 overflow-hidden hover:shadow-md dark:hover:ring-gray-600 transition-all duration-300">
      <div className="md:flex">
        {/* Image */}
        {post.image && (
          <Link href={`/${post.slug}`} passHref>
            <a className="block md:w-5/12 overflow-hidden flex-shrink-0">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={380}
                layout="responsive"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-500 h-full w-full"
                priority
              />
            </a>
          </Link>
        )}

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-center gap-3 flex-1">
          <div className="flex flex-wrap gap-2">
            {post.categories?.map((cat, i) => (
              <CategoryBadge key={i} category={cat} />
            ))}
          </div>

          <h2 className="text-h3-sm md:text-h3 font-bold text-dark dark:text-gray-100 leading-tight">
            <Link href={`/${post.slug}`} passHref>
              <a className="hover:text-primary dark:hover:text-primary transition-colors">
                {post.title}
              </a>
            </Link>
          </h2>

          {excerpt && (
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          )}

          <PostMeta post={post} />

          <Link href={`/${post.slug}`} passHref>
            <a className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all mt-1 w-fit">
              Read article
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
};

/** Regular post card */
const PostCard = ({ post }) => {
  const excerpt =
    post.description || stripHtml(post.content || "").slice(0, 140);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none dark:ring-1 dark:ring-gray-700 overflow-hidden hover:shadow-md dark:hover:ring-gray-600 transition-all duration-300 flex flex-col h-full group">
      {/* Image */}
      {post.image && (
        <Link href={`/${post.slug}`} passHref>
          <a className="block overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={445}
              height={250}
              layout="responsive"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-500"
            />
          </a>
        </Link>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {post.categories?.map((cat, i) => (
            <CategoryBadge key={i} category={cat} />
          ))}
        </div>

        <h3 className="font-bold text-dark dark:text-gray-100 text-h4 leading-snug">
          <Link href={`/${post.slug}`} passHref>
            <a className="hover:text-primary dark:hover:text-primary transition-colors">
              {post.title}
            </a>
          </Link>
        </h3>

        {excerpt && (
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">
            {excerpt}
          </p>
        )}

        <PostMeta post={post} />
      </div>
    </article>
  );
};

const Posts = ({ posts = [], className }) => {
  if (!posts.length) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <p className="text-gray-400 dark:text-gray-600 text-lg">No posts found.</p>
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className={className}>
      {/* Featured hero post */}
      <div className="mb-8">
        <FeaturedPostCard post={featured} />
      </div>

      {/* Grid of remaining posts */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {rest.map((post, i) => (
            <PostCard key={post._id || post.slug || i} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
