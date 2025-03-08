export class Article {
	id: string;
	title: string;
	created_at: string;
	url: string;

	constructor(id: string, title: string, created_at: string, url: string) {
		this.id = id;
		this.title = title;
		this.created_at = new Date(created_at).toISOString().split("T")[0];
		this.url = url;
	}
}
