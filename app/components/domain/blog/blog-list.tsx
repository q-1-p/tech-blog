"use client";

import { useEffect, useState } from "react";
import type { Blog } from "../../../../domain/blog";
import { BlogCard } from "./blog-card";

export const BlogList = ({ maximumNumberOfPages }: { maximumNumberOfPages: number }) => {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_MINE_URL}/api/cms?per_page=${maximumNumberOfPages}`,
					{
						cache: "no-store",
					},
				);
				const data: Blog[] = await res.json();
				setBlogs(data);
			} catch (error) {
				console.error("ブログデータの取得に失敗しました", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, [maximumNumberOfPages]);

	if (loading) {
		return <div>Loading...</div>;
	}

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
