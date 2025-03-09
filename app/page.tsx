import { ArticleList } from "./components/domain/article/article-list";
import { BlogList } from "./components/domain/blog/blog-list";

interface Article {
	id: string;
	title: string;
	created_at: string;
	url: string;
	body: string;
}

export default async function Page() {
	return (
		<>
			<div className="container mx-auto">
				<div className="pb-6 flex justify-between items-center">
					<h2 className="text-2xl font-bold">Qiita記事一覧</h2>
					<a
						href="/article"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						すべての記事を表示
					</a>
				</div>
				<ArticleList maximumNumberOfPages={4} />
			</div>

			<div className="container mx-auto">
				<div className="pb-6 flex justify-between items-center">
					<h2 className="text-2xl font-bold">ブログ記事一覧</h2>
					<a
						href="/blog"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						すべての記事を表示
					</a>
				</div>
				<BlogList maximumNumberOfPages={4} />
			</div>
		</>
	);
}
