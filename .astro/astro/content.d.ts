declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"books": {
"abduction.mdx": {
	id: "abduction.mdx";
  slug: "abduction";
  body: string;
  collection: "books";
  data: any
} & { render(): Render[".mdx"] };
"perfect-story.mdx": {
	id: "perfect-story.mdx";
  slug: "perfect-story";
  body: string;
  collection: "books";
  data: any
} & { render(): Render[".mdx"] };
"sky.mdx": {
	id: "sky.mdx";
  slug: "sky";
  body: string;
  collection: "books";
  data: any
} & { render(): Render[".mdx"] };
"wings.mdx": {
	id: "wings.mdx";
  slug: "kirin";
  body: string;
  collection: "books";
  data: any
} & { render(): Render[".mdx"] };
};
"education": {
"advanced-react.mdx": {
	id: "advanced-react.mdx";
  slug: "advanced-react";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
"ccna-routing-switching.mdx": {
	id: "ccna-routing-switching.mdx";
  slug: "ccna-routing-switching";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
"it-essentials.mdx": {
	id: "it-essentials.mdx";
  slug: "it-essentials";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
"linux-essentials.mdx": {
	id: "linux-essentials.mdx";
  slug: "linux-essentials";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
"microcomputer-systems.mdx": {
	id: "microcomputer-systems.mdx";
  slug: "microcomputer-systems";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
"oracle-plsql.mdx": {
	id: "oracle-plsql.mdx";
  slug: "oracle-plsql";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
"oracle-sql.mdx": {
	id: "oracle-sql.mdx";
  slug: "oracle-sql";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
"svelte-master.mdx": {
	id: "svelte-master.mdx";
  slug: "svelte-master";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
"system-network-admin.mdx": {
	id: "system-network-admin.mdx";
  slug: "system-network-admin";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
"windows-server.mdx": {
	id: "windows-server.mdx";
  slug: "windows-server";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".mdx"] };
};
"experiences": {
"abast.mdx": {
	id: "abast.mdx";
  slug: "abast";
  body: string;
  collection: "experiences";
  data: any
} & { render(): Render[".mdx"] };
"carbonell.mdx": {
	id: "carbonell.mdx";
  slug: "carbonell";
  body: string;
  collection: "experiences";
  data: any
} & { render(): Render[".mdx"] };
"carinsa.mdx": {
	id: "carinsa.mdx";
  slug: "carinsa";
  body: string;
  collection: "experiences";
  data: any
} & { render(): Render[".mdx"] };
"excelent.mdx": {
	id: "excelent.mdx";
  slug: "excelent";
  body: string;
  collection: "experiences";
  data: any
} & { render(): Render[".mdx"] };
"onlinevalles.mdx": {
	id: "onlinevalles.mdx";
  slug: "onlinevalles";
  body: string;
  collection: "experiences";
  data: any
} & { render(): Render[".mdx"] };
"opencloud.mdx": {
	id: "opencloud.mdx";
  slug: "opencloud";
  body: string;
  collection: "experiences";
  data: any
} & { render(): Render[".mdx"] };
};
"music": {
"Paradis City.md": {
	id: "Paradis City.md";
  slug: "paradis-city";
  body: string;
  collection: "music";
  data: any
} & { render(): Render[".md"] };
"Past Lives.md": {
	id: "Past Lives.md";
  slug: "past-lives";
  body: string;
  collection: "music";
  data: any
} & { render(): Render[".md"] };
"sample-album.md": {
	id: "sample-album.md";
  slug: "sample-album";
  body: string;
  collection: "music";
  data: any
} & { render(): Render[".md"] };
};
"posts": {
"booking-scam.mdx": {
	id: "booking-scam.mdx";
  slug: "booking-scam";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".mdx"] };
"chatgpt.mdx": {
	id: "chatgpt.mdx";
  slug: "chatgpt";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".mdx"] };
"feedback.mdx": {
	id: "feedback.mdx";
  slug: "feedback";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".mdx"] };
"hexagonal-arch.mdx": {
	id: "hexagonal-arch.mdx";
  slug: "hexagonal-arch";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".mdx"] };
"k8s.mdx": {
	id: "k8s.mdx";
  slug: "k8s";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".mdx"] };
};
"projects": {
"api-rest.mdx": {
	id: "api-rest.mdx";
  slug: "api-rest";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".mdx"] };
"basic-discord-theme.mdx": {
	id: "basic-discord-theme.mdx";
  slug: "basic-discord-theme";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".mdx"] };
"kit-unix.mdx": {
	id: "kit-unix.mdx";
  slug: "kit-unix";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".mdx"] };
"rof.mdx": {
	id: "rof.mdx";
  slug: "rof";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".mdx"] };
"web-portfolio.mdx": {
	id: "web-portfolio.mdx";
  slug: "web-portfolio";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
