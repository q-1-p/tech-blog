import { ArticleList } from "../components/domain/article-list";

export default async function Page() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="pb-6 flex justify-between items-center">
				<h2 className="text-2xl font-bold">技術記事一覧</h2>
			</div>

			<ArticleList maximumNumberOfPages={100} />
		</div>
	);
}
