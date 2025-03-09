import type { Blog } from "../../../../domain/blog";
import { BlogCard } from "./blog-card";

export const BlogList = async (props: { maximumNumberOfPages: number }) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_MINE_URL}/api/cms?per_page=${props.maximumNumberOfPages}`,
		{
			cache: "no-store",
		},
	);
	const blogs: Blog[] = await res.json();

	return (
		<div className="relative overflow-x-auto pb-4">
			<div className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
				{blogs.map((blog) => (
					<div key={blog.id} className="snap-start flex-shrink-0 w-sm">
						<BlogCard blog={blog} />
					</div>
				))}
			</div>
		</div>
	);
};
