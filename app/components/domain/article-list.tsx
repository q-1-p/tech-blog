import type { Article } from "../../../domain/article";
import { ArticleCard } from "./article-card";

export const ArticleList = async (props: { maximumNumberOfPages: number }) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_MINE_URL}/api/qiita?per_page=${props.maximumNumberOfPages}`,
		{
			cache: "no-store",
		},
	);
	const articles: Article[] = await res.json();

	return (
		<div className="relative overflow-x-auto pb-4">
			<div className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
				{articles.map((article) => (
					<div key={article.id} className="snap-start flex-shrink-0 w-sm">
						<ArticleCard article={article} />
					</div>
				))}
			</div>
		</div>
	);
};
