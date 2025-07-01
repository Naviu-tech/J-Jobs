declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
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
		"company": {
"convergint.md": {
	id: "convergint.md";
  slug: "convergint";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
"hal-hayes-electric.md": {
	id: "hal-hayes-electric.md";
  slug: "hal-hayes-electric";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
"salt-n-light-electric.md": {
	id: "salt-n-light-electric.md";
  slug: "salt-n-light-electric";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
"west-coast-fire.md": {
	id: "west-coast-fire.md";
  slug: "west-coast-fire";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
};
"customers": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "customers";
  data: InferEntrySchema<"customers">
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "customers";
  data: InferEntrySchema<"customers">
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "customers";
  data: InferEntrySchema<"customers">
} & { render(): Render[".md"] };
};
"glossary": {
"box-clamp.md": {
	id: "box-clamp.md";
  slug: "box-clamp";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"bulk-storage-bin.md": {
	id: "bulk-storage-bin.md";
  slug: "bulk-storage-bin";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"conveyor-belt.md": {
	id: "conveyor-belt.md";
  slug: "conveyor-belt";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"dock-leveler.md": {
	id: "dock-leveler.md";
  slug: "dock-leveler";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"dock-plate.md": {
	id: "dock-plate.md";
  slug: "dock-plate";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"dock-shelter.md": {
	id: "dock-shelter.md";
  slug: "dock-shelter";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"floor-scale.md": {
	id: "floor-scale.md";
  slug: "floor-scale";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"freight-elevator.md": {
	id: "freight-elevator.md";
  slug: "freight-elevator";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"hand-truck.md": {
	id: "hand-truck.md";
  slug: "hand-truck";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"lift-gate.md": {
	id: "lift-gate.md";
  slug: "lift-gate";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"loading-dock-bumper.md": {
	id: "loading-dock-bumper.md";
  slug: "loading-dock-bumper";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"loading-dock.md": {
	id: "loading-dock.md";
  slug: "loading-dock";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"loading-ramp.md": {
	id: "loading-ramp.md";
  slug: "loading-ramp";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"material-handler.md": {
	id: "material-handler.md";
  slug: "material-handler";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"order-picker.md": {
	id: "order-picker.md";
  slug: "order-picker";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"pallet-jack.md": {
	id: "pallet-jack.md";
  slug: "pallet-jack";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"pallet-rack.md": {
	id: "pallet-rack.md";
  slug: "pallet-rack";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"parcel-scanner.md": {
	id: "parcel-scanner.md";
  slug: "parcel-scanner";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"pick-to-light-system.md": {
	id: "pick-to-light-system.md";
  slug: "pick-to-light-system";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"receiving-bay.md": {
	id: "receiving-bay.md";
  slug: "receiving-bay";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"roller-conveyor.md": {
	id: "roller-conveyor.md";
  slug: "roller-conveyor";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"shipping-bay.md": {
	id: "shipping-bay.md";
  slug: "shipping-bay";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"shrink-wrap-machine.md": {
	id: "shrink-wrap-machine.md";
  slug: "shrink-wrap-machine";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"strapping-machine.md": {
	id: "strapping-machine.md";
  slug: "strapping-machine";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"stretch-wrap-dispenser.md": {
	id: "stretch-wrap-dispenser.md";
  slug: "stretch-wrap-dispenser";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
"warehouse-safety-barrier.md": {
	id: "warehouse-safety-barrier.md";
  slug: "warehouse-safety-barrier";
  body: string;
  collection: "glossary";
  data: InferEntrySchema<"glossary">
} & { render(): Render[".md"] };
};
"helpcenter": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
};
"infopages": {
"bug-bounty.md": {
	id: "bug-bounty.md";
  slug: "bug-bounty";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
"dpa.md": {
	id: "dpa.md";
  slug: "dpa";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
"privacy.md": {
	id: "privacy.md";
  slug: "privacy";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
"terms.md": {
	id: "terms.md";
  slug: "terms";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
};
"integrations": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">;
  render(): Render[".md"];
}>;
"jobs": {
"ALBEuqk2k5.md": {
	id: "ALBEuqk2k5.md";
  slug: "albeuqk2k5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"BS33445.md": {
	id: "BS33445.md";
  slug: "bs33445";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"DS24680.md": {
	id: "DS24680.md";
  slug: "ds24680";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"DS55667.md": {
	id: "DS55667.md";
  slug: "ds55667";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"EC77889.md": {
	id: "EC77889.md";
  slug: "ec77889";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"GB98765.md": {
	id: "GB98765.md";
  slug: "gb98765";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"HC11223.md": {
	id: "HC11223.md";
  slug: "hc11223";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"TECH12345.md": {
	id: "TECH12345.md";
  slug: "tech12345";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"VIRGtnjzgj.md": {
	id: "VIRGtnjzgj.md";
  slug: "virgtnjzgj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
};
"posts": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">;
  render(): Render[".md"];
}>;
"recruiting": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "recruiting";
  data: InferEntrySchema<"recruiting">;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
