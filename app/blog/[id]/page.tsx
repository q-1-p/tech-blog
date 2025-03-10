import Image from "next/image";
import type { Blog } from "../../../domain/blog";

export default async function Page({ params }: { params: { id: string } }) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_MINE_URL}/api/cms`, {
		cache: "no-store",
	});
	const blogs: Blog[] = await res.json();
	const blog = blogs.find((blog) => blog.id === params.id);
	const thumbnailUrl: string = await fetch(
		`${process.env.NEXT_PUBLIC_MINE_URL}/api/cms-thumbnail`,
		{
			cache: "no-store",
		},
	)
		.then(async (response) => {
			const { url } = await response.json();
			console.log(`サムネイル取得成功: ${url}`);
			return url;
		})
		.catch((error) => {
			console.error("サムネイル取得エラー:", error);
			return "";
		});

	// ブログが見つからない場合
	if (!blog) {
		return (
			<div className="max-w-3xl mx-auto p-5 text-center">
				<h1 className="text-4xl mb-10 mt-10">ブログが見つかりませんでした</h1>
			</div>
		);
	}

	if (blog === undefined) {
		throw new Error("Blog is undefined");
	}
	return (
		<div className="bg-white text-black max-w-3xl mx-auto p-5">
			<div className="relative w-full h-64 overflow-hidden mb-6">
				<Image
					src={thumbnailUrl}
					fill
					className="object-cover"
					alt={blog.title || "ブログ画像"}
				/>
			</div>
			<h1 className="text-3xl">{blog.title}</h1>
			<div className="text-sm leading-relaxed text-justify mt-4">
				<div dangerouslySetInnerHTML={{ __html: blog.content }} />
			</div>
			<p className="mt-4 text-gray-600">{blog.created_at}</p>
		</div>
	);
}
