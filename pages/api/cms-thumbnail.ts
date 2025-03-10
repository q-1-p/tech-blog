import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	apiRequest: NextApiRequest,
	apiResponse: NextApiResponse,
) {
	return await fetch(
		`${process.env.NEXT_PUBLIC_CMS_MANAGEMENT_DOMAIN}/api/v1/media`,
		{
			headers: {
				"X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_CMS_ACCESS_TOKEN ?? "",
			},
		},
	)
		.then(async (response) => {
			const data = await response.json();
			apiResponse.status(200).json({ url: data.media[0].url });
		})
		.catch((error) => {
			console.error("microCMS API error:", error);
			apiResponse.status(500).json({ error: error.message });
		});
}
