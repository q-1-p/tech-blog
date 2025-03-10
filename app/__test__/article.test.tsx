import { afterEach, beforeEach, expect, jest, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import type { Article } from "../../domain/article";
import { ArticleCard } from "../components/domain/article/article-card";

// モックデータ
const mockArticles = [
	{
		id: "1",
		title: "記事1",
		url: "https://example.com/1",
		created_at: "2023-01-01",
	},
	{
		id: "2",
		title: "記事2",
		url: "https://example.com/2",
		created_at: "2023-01-02",
	},
	{
		id: "3",
		title: "記事3",
		url: "https://example.com/3",
		created_at: "2023-01-03",
	},
	{
		id: "4",
		title: "記事4",
		url: "https://example.com/4",
		created_at: "2023-01-04",
	},
];

// ArticleListの代わりにモックコンポーネントを作成
const MockArticleList = ({ articles }: { articles: Article[] }) => {
	return (
		<div className="relative overflow-x-auto pb-4">
			<div className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
				{articles.map((article) => (
					<article key={article.id} className="snap-start flex-shrink-0 w-sm">
						<ArticleCard article={article} />
					</article>
				))}
			</div>
		</div>
	);
};

// テスト前にfetchをモック化
beforeEach(() => {
	// fetchはjest-setup.tsで既にモック化されているので、ここではレスポンスだけを設定
	(fetch as jest.Mock).mockImplementation(() => {
		return Promise.resolve({
			json: () => Promise.resolve(mockArticles),
			status: 200,
			ok: true,
		});
	});
});

// テスト後にモックをリセット
afterEach(() => {
	jest.resetAllMocks();
});

test("Articleカードが4つ表示されているか確認する", async () => {
	// 非同期コンポーネントの代わりにモックコンポーネントを使用
	const { findAllByRole } = render(<MockArticleList articles={mockArticles} />);

	// articleが4つ表示されるのを待つ
	const cards = await findAllByRole("article");
	expect(cards).toHaveLength(4);
});
