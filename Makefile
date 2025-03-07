test:
	bun run jest

dev:
	bun run dev

deploy:
	bun run build
	firebase deploy