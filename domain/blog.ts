export class Blog {
	id: string;
	title: string;
	created_at: string;
	thumbnailUrl: string;
	content: string;

	constructor(
		id: string,
		title: string,
		created_at: string,
		url: string,
		content: string,
	) {
		this.id = id;
		this.title = title;
		this.created_at = new Date(created_at).toISOString().split("T")[0];
		this.thumbnailUrl = url;
		this.content = content;
	}
}
