export function getBaseUrl(): string {
	const host =
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_SITE_URL!
			: `http://localhost:${process.env.PORT ?? 3000}`;
	return host;
}
