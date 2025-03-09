import type { NextApiRequest, NextApiResponse } from "next";
import { Blog } from "../../domain/blog";

export default async function handler(
	apiRequest: NextApiRequest,
	apiResponse: NextApiResponse,
) {
	const perPage = (apiRequest.query.per_page as string) || "4";
	return await fetch(
		`${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/v1/blog?limit=${perPage}`,
		{
			headers: {
				"X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_CMS_ACCESS_TOKEN ?? "",
			},
		},
	)
		.then(async (response) => {
			const data = await response.json();
			const contents = data.contents || [];
			const blogs = contents.map(
				(blog) =>
					new Blog(
						blog.id,
						blog.title,
						blog.createdAt || blog.created_at,
						blog.url || `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/blog/${blog.id}`,
						blog.content,
					),
			);
			apiResponse.status(200).json(blogs);
		})
		.catch((error) => {
			console.error("microCMS API error:", error);
			apiResponse.status(500).json({ error: error.message });
		});
}
