import { expect, test, jest, beforeEach, afterEach } from "@jest/globals";
import {
	render,
	screen,
} from "@testing-library/react";
import { BlogList } from "../components/domain/blog/blog-list";

// モックデータ
const mockBlogs = [
	{ id: "1", title: "ブログ1", content: "内容1", publishedAt: "2023-01-01" },
	{ id: "2", title: "ブログ2", content: "内容2", publishedAt: "2023-01-02" },
	{ id: "3", title: "ブログ3", content: "内容3", publishedAt: "2023-01-03" },
	{ id: "4", title: "ブログ4", content: "内容4", publishedAt: "2023-01-04" },
];

// テスト前にfetchをモック化
beforeEach(() => {
	// fetchはjest-setup.tsで既にモック化されているので、ここではレスポンスだけを設定
	(fetch as jest.Mock).mockImplementation(() => {
		return Promise.resolve({
			json: () => Promise.resolve(mockBlogs),
			status: 200,
			ok: true
		});
	});
});

// テスト後にモックをリセット
afterEach(() => {
	jest.resetAllMocks();
});

test("Blogカードが4つ表示されているか確認する", async () => {
	const { findAllByRole } = render(<BlogList maximumNumberOfPages={4} />);

	// articleが4つ表示されるのを待つ
	const cards = await findAllByRole("article");
	expect(cards).toHaveLength(4);
	
	// fetchが正しいURLで呼び出されたことを確認
	expect(fetch).toHaveBeenCalledWith(
		expect.stringContaining("/api/cms?per_page=4"),
		expect.any(Object)
	);
});
