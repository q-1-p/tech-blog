import Link from "next/link";
import type { Blog } from "../../../../domain/blog";

export const BlogCard = ({ blog }: { blog: Blog }) => {
	return (
		<article className="card bg-base-100 p-2 w-96 shadow-sm">
			<Link href={`/blog/${blog.id}`}>
				<figure>
					<img
						src="https://images.microcms-assets.io/assets/2f9ebd4d9b1c4bc69e2e7cb4a2f7d178/876aa782217f42b58281e7cb8dab79d3/blog-template.png?w=320"
						alt="Shoes"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">{blog.title}</h2>
					<p>{blog.created_at}</p>
				</div>
			</Link>
		</article>
	);
};
