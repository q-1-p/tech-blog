import { BlogList } from "../components/domain/blog/blog-list";

export default async function Page() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="pb-6 flex justify-between items-center">
				<h2 className="text-2xl font-bold">技術記事一覧</h2>
			</div>

			<BlogList maximumNumberOfPages={100} />
		</div>
	);
}
