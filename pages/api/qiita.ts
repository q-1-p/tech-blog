import type { NextApiRequest, NextApiResponse } from "next";
import { Article } from "../../domain/article";

export default async function handler(
	apiRequest: NextApiRequest,
	apiResponse: NextApiResponse,
) {
	const perPage = (apiRequest.query.per_page as string) || "4";
	return await fetch(
		`https://qiita.com/api/v2/users/q-1-p/items?per_page=${perPage}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_ACCESS_TOKEN}`,
			},
		},
	)
		.then(async (response) => {
			const articles = (await response.json()).map(
				(article) =>
					new Article(
						article.id,
						article.title,
						article.created_at,
						article.url,
					),
			);
			apiResponse.status(200).json(articles);
		})
		.catch((error) => apiResponse.status(500).json({ error: error.message }));
}
