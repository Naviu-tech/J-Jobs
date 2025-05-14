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
"albertsons-assistant-inventory-clerk-glendora-albeuqk2k5.md": {
	id: "albertsons-assistant-inventory-clerk-glendora-albeuqk2k5.md";
  slug: "albertsons-assistant-inventory-clerk-glendora-albeuqk2k5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-assistant-receiving-clerk-hacienda-heights-albervg7y5.md": {
	id: "albertsons-assistant-receiving-clerk-hacienda-heights-albervg7y5.md";
  slug: "albertsons-assistant-receiving-clerk-hacienda-heights-albervg7y5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-assistant-shipping-clerk-rowland-heights-albeoa1p81.md": {
	id: "albertsons-assistant-shipping-clerk-rowland-heights-albeoa1p81.md";
  slug: "albertsons-assistant-shipping-clerk-rowland-heights-albeoa1p81";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-pallet-jack-operator-norco-albe37istq.md": {
	id: "albertsons-pallet-jack-operator-norco-albe37istq.md";
  slug: "albertsons-pallet-jack-operator-norco-albe37istq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-warehouse-assembler-irwindale-albe8sfm93.md": {
	id: "albertsons-warehouse-assembler-irwindale-albe8sfm93.md";
  slug: "albertsons-warehouse-assembler-irwindale-albe8sfm93";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-warehouse-associate-city-of-industry-albef57bmx.md": {
	id: "albertsons-warehouse-associate-city-of-industry-albef57bmx.md";
  slug: "albertsons-warehouse-associate-city-of-industry-albef57bmx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-warehouse-forklift-operator-covina-albe38yw83.md": {
	id: "albertsons-warehouse-forklift-operator-covina-albe38yw83.md";
  slug: "albertsons-warehouse-forklift-operator-covina-albe38yw83";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-warehouse-loader-walnut-albe9d10zg.md": {
	id: "albertsons-warehouse-loader-walnut-albe9d10zg.md";
  slug: "albertsons-warehouse-loader-walnut-albe9d10zg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-warehouse-material-handler-la-puente-albe8239pt.md": {
	id: "albertsons-warehouse-material-handler-la-puente-albe8239pt.md";
  slug: "albertsons-warehouse-material-handler-la-puente-albe8239pt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-warehouse-picker-&-packer-san-dimas-albe31d1rz.md": {
	id: "albertsons-warehouse-picker-&-packer-san-dimas-albe31d1rz.md";
  slug: "albertsons-warehouse-picker--packer-san-dimas-albe31d1rz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"albertsons-warehouse-unloader-baldwin-park-albeo19bct.md": {
	id: "albertsons-warehouse-unloader-baldwin-park-albeo19bct.md";
  slug: "albertsons-warehouse-unloader-baldwin-park-albeo19bct";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-assistant-inventory-clerk-laguna-beach-amaznp1j93.md": {
	id: "amazon-assistant-inventory-clerk-laguna-beach-amaznp1j93.md";
  slug: "amazon-assistant-inventory-clerk-laguna-beach-amaznp1j93";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-assistant-receiving-clerk-san-clemente-amazte2vpk.md": {
	id: "amazon-assistant-receiving-clerk-san-clemente-amazte2vpk.md";
  slug: "amazon-assistant-receiving-clerk-san-clemente-amazte2vpk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-assistant-shipping-clerk-lake-forest-amazklvgod.md": {
	id: "amazon-assistant-shipping-clerk-lake-forest-amazklvgod.md";
  slug: "amazon-assistant-shipping-clerk-lake-forest-amazklvgod";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-pallet-jack-operator-san-juan-capistrano-amazkwd00y.md": {
	id: "amazon-pallet-jack-operator-san-juan-capistrano-amazkwd00y.md";
  slug: "amazon-pallet-jack-operator-san-juan-capistrano-amazkwd00y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-warehouse-assembler-placentia-amaz8ckfin.md": {
	id: "amazon-warehouse-assembler-placentia-amaz8ckfin.md";
  slug: "amazon-warehouse-assembler-placentia-amaz8ckfin";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-warehouse-associate-pomona-amazn2rd5c.md": {
	id: "amazon-warehouse-associate-pomona-amazn2rd5c.md";
  slug: "amazon-warehouse-associate-pomona-amazn2rd5c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-warehouse-forklift-operator-mission-viejo-amazsxkhdk.md": {
	id: "amazon-warehouse-forklift-operator-mission-viejo-amazsxkhdk.md";
  slug: "amazon-warehouse-forklift-operator-mission-viejo-amazsxkhdk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-warehouse-loader-diamond-bar-amazpvoltv.md": {
	id: "amazon-warehouse-loader-diamond-bar-amazpvoltv.md";
  slug: "amazon-warehouse-loader-diamond-bar-amazpvoltv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-warehouse-material-handler-la-habra-amazovhy9t.md": {
	id: "amazon-warehouse-material-handler-la-habra-amazovhy9t.md";
  slug: "amazon-warehouse-material-handler-la-habra-amazovhy9t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-warehouse-picker-&-packer-costa-mesa-amaz4qjrhu.md": {
	id: "amazon-warehouse-picker-&-packer-costa-mesa-amaz4qjrhu.md";
  slug: "amazon-warehouse-picker--packer-costa-mesa-amaz4qjrhu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"amazon-warehouse-unloader-brea-amaze6kzpp.md": {
	id: "amazon-warehouse-unloader-brea-amaze6kzpp.md";
  slug: "amazon-warehouse-unloader-brea-amaze6kzpp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-assistant-inventory-clerk-fountain-valley-ape9p65sj.md": {
	id: "ap-express-assistant-inventory-clerk-fountain-valley-ape9p65sj.md";
  slug: "ap-express-assistant-inventory-clerk-fountain-valley-ape9p65sj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-assistant-receiving-clerk-ontario-apexw8hon.md": {
	id: "ap-express-assistant-receiving-clerk-ontario-apexw8hon.md";
  slug: "ap-express-assistant-receiving-clerk-ontario-apexw8hon";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-assistant-shipping-clerk-west-covina-ape1etyfp.md": {
	id: "ap-express-assistant-shipping-clerk-west-covina-ape1etyfp.md";
  slug: "ap-express-assistant-shipping-clerk-west-covina-ape1etyfp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-pallet-jack-operator-chino-apeq11ikg.md": {
	id: "ap-express-pallet-jack-operator-chino-apeq11ikg.md";
  slug: "ap-express-pallet-jack-operator-chino-apeq11ikg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-warehouse-assembler-tustin-apeyxbq0g.md": {
	id: "ap-express-warehouse-assembler-tustin-apeyxbq0g.md";
  slug: "ap-express-warehouse-assembler-tustin-apeyxbq0g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-warehouse-associate-anaheim-apeikmd0d.md": {
	id: "ap-express-warehouse-associate-anaheim-apeikmd0d.md";
  slug: "ap-express-warehouse-associate-anaheim-apeikmd0d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-warehouse-forklift-operator-huntington-beach-apeb60ptd.md": {
	id: "ap-express-warehouse-forklift-operator-huntington-beach-apeb60ptd.md";
  slug: "ap-express-warehouse-forklift-operator-huntington-beach-apeb60ptd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-warehouse-loader-garden-grove-ape27srcy.md": {
	id: "ap-express-warehouse-loader-garden-grove-ape27srcy.md";
  slug: "ap-express-warehouse-loader-garden-grove-ape27srcy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-warehouse-material-handler-orange-ape9cdgww.md": {
	id: "ap-express-warehouse-material-handler-orange-ape9cdgww.md";
  slug: "ap-express-warehouse-material-handler-orange-ape9cdgww";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-warehouse-picker-&-packer-irvine-apeeyejng.md": {
	id: "ap-express-warehouse-picker-&-packer-irvine-apeeyejng.md";
  slug: "ap-express-warehouse-picker--packer-irvine-apeeyejng";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"ap-express-warehouse-unloader-santa-ana-apeidu561.md": {
	id: "ap-express-warehouse-unloader-santa-ana-apeidu561.md";
  slug: "ap-express-warehouse-unloader-santa-ana-apeidu561";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-assistant-inventory-clerk-redlands-boeiflslbv.md": {
	id: "boeing-assistant-inventory-clerk-redlands-boeiflslbv.md";
  slug: "boeing-assistant-inventory-clerk-redlands-boeiflslbv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-assistant-receiving-clerk-ontario-ranch-boeioajd28.md": {
	id: "boeing-assistant-receiving-clerk-ontario-ranch-boeioajd28.md";
  slug: "boeing-assistant-receiving-clerk-ontario-ranch-boeioajd28";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-assistant-shipping-clerk-chino-hills-boeim8e2ri.md": {
	id: "boeing-assistant-shipping-clerk-chino-hills-boeim8e2ri.md";
  slug: "boeing-assistant-shipping-clerk-chino-hills-boeim8e2ri";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-pallet-jack-operator-lynwood-boeiuqbm77.md": {
	id: "boeing-pallet-jack-operator-lynwood-boeiuqbm77.md";
  slug: "boeing-pallet-jack-operator-lynwood-boeiuqbm77";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-warehouse-assembler-fontana-boeirp5bfo.md": {
	id: "boeing-warehouse-assembler-fontana-boeirp5bfo.md";
  slug: "boeing-warehouse-assembler-fontana-boeirp5bfo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-warehouse-associate-corona-boeibzscro.md": {
	id: "boeing-warehouse-associate-corona-boeibzscro.md";
  slug: "boeing-warehouse-associate-corona-boeibzscro";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-warehouse-forklift-operator-colton-boeikrgaax.md": {
	id: "boeing-warehouse-forklift-operator-colton-boeikrgaax.md";
  slug: "boeing-warehouse-forklift-operator-colton-boeikrgaax";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-warehouse-loader-perris-boeiwskijx.md": {
	id: "boeing-warehouse-loader-perris-boeiwskijx.md";
  slug: "boeing-warehouse-loader-perris-boeiwskijx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-warehouse-material-handler-riverside-boeia0l4mb.md": {
	id: "boeing-warehouse-material-handler-riverside-boeia0l4mb.md";
  slug: "boeing-warehouse-material-handler-riverside-boeia0l4mb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-warehouse-picker-&-packer-san-bernardino-boein30u9r.md": {
	id: "boeing-warehouse-picker-&-packer-san-bernardino-boein30u9r.md";
  slug: "boeing-warehouse-picker--packer-san-bernardino-boein30u9r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"boeing-warehouse-unloader-jurupa-valley-boeioko94p.md": {
	id: "boeing-warehouse-unloader-jurupa-valley-boeioko94p.md";
  slug: "boeing-warehouse-unloader-jurupa-valley-boeioko94p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-assistant-inventory-clerk-la-palma-lamivtltc4.md": {
	id: "lamill-coffee-assistant-inventory-clerk-la-palma-lamivtltc4.md";
  slug: "lamill-coffee-assistant-inventory-clerk-la-palma-lamivtltc4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-assistant-receiving-clerk-pacoima-lamiqyr8ri.md": {
	id: "lamill-coffee-assistant-receiving-clerk-pacoima-lamiqyr8ri.md";
  slug: "lamill-coffee-assistant-receiving-clerk-pacoima-lamiqyr8ri";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-assistant-shipping-clerk-sylmar-lamic8ecwa.md": {
	id: "lamill-coffee-assistant-shipping-clerk-sylmar-lamic8ecwa.md";
  slug: "lamill-coffee-assistant-shipping-clerk-sylmar-lamic8ecwa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-pallet-jack-operator-north-hills-lamiz262lg.md": {
	id: "lamill-coffee-pallet-jack-operator-north-hills-lamiz262lg.md";
  slug: "lamill-coffee-pallet-jack-operator-north-hills-lamiz262lg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-assembler-artesia-lami7bhv2u.md": {
	id: "lamill-coffee-warehouse-assembler-artesia-lami7bhv2u.md";
  slug: "lamill-coffee-warehouse-assembler-artesia-lami7bhv2u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-associate-cerritos-lamirsq0hp.md": {
	id: "lamill-coffee-warehouse-associate-cerritos-lamirsq0hp.md";
  slug: "lamill-coffee-warehouse-associate-cerritos-lamirsq0hp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-forklift-operator-sun-valley-lami94jtyj.md": {
	id: "lamill-coffee-warehouse-forklift-operator-sun-valley-lami94jtyj.md";
  slug: "lamill-coffee-warehouse-forklift-operator-sun-valley-lami94jtyj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-loader-signal-hill-lami2ww6mz.md": {
	id: "lamill-coffee-warehouse-loader-signal-hill-lami2ww6mz.md";
  slug: "lamill-coffee-warehouse-loader-signal-hill-lami2ww6mz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-material-handler-bell-lamibnsy0x.md": {
	id: "lamill-coffee-warehouse-material-handler-bell-lamibnsy0x.md";
  slug: "lamill-coffee-warehouse-material-handler-bell-lamibnsy0x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-picker-&-packer-rancho-dominguez-lamizg0tg5.md": {
	id: "lamill-coffee-warehouse-picker-&-packer-rancho-dominguez-lamizg0tg5.md";
  slug: "lamill-coffee-warehouse-picker--packer-rancho-dominguez-lamizg0tg5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lamill-coffee-warehouse-unloader-huntington-park-lami33srt0.md": {
	id: "lamill-coffee-warehouse-unloader-huntington-park-lami33srt0.md";
  slug: "lamill-coffee-warehouse-unloader-huntington-park-lami33srt0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-assistant-inventory-clerk-hawthorne-linegqhskw.md": {
	id: "lineage-logistics-assistant-inventory-clerk-hawthorne-linegqhskw.md";
  slug: "lineage-logistics-assistant-inventory-clerk-hawthorne-linegqhskw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-assistant-receiving-clerk-carson-lineocyt6u.md": {
	id: "lineage-logistics-assistant-receiving-clerk-carson-lineocyt6u.md";
  slug: "lineage-logistics-assistant-receiving-clerk-carson-lineocyt6u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-assistant-shipping-clerk-long-beach-linewkw7aw.md": {
	id: "lineage-logistics-assistant-shipping-clerk-long-beach-linewkw7aw.md";
  slug: "lineage-logistics-assistant-shipping-clerk-long-beach-linewkw7aw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-pallet-jack-operator-compton-linedacsr0.md": {
	id: "lineage-logistics-pallet-jack-operator-compton-linedacsr0.md";
  slug: "lineage-logistics-pallet-jack-operator-compton-linedacsr0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-assembler-el-segundo-linec1m4q3.md": {
	id: "lineage-logistics-warehouse-assembler-el-segundo-linec1m4q3.md";
  slug: "lineage-logistics-warehouse-assembler-el-segundo-linec1m4q3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-associate-los-angeles-linedldwx1.md": {
	id: "lineage-logistics-warehouse-associate-los-angeles-linedldwx1.md";
  slug: "lineage-logistics-warehouse-associate-los-angeles-linedldwx1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-forklift-operator-gardena-linery07qy.md": {
	id: "lineage-logistics-warehouse-forklift-operator-gardena-linery07qy.md";
  slug: "lineage-logistics-warehouse-forklift-operator-gardena-linery07qy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-loader-culver-city-linetcyuet.md": {
	id: "lineage-logistics-warehouse-loader-culver-city-linetcyuet.md";
  slug: "lineage-logistics-warehouse-loader-culver-city-linetcyuet";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-material-handler-west-hollywood-linet8zfwy.md": {
	id: "lineage-logistics-warehouse-material-handler-west-hollywood-linet8zfwy.md";
  slug: "lineage-logistics-warehouse-material-handler-west-hollywood-linet8zfwy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-picker-&-packer-torrance-linewwab80.md": {
	id: "lineage-logistics-warehouse-picker-&-packer-torrance-linewwab80.md";
  slug: "lineage-logistics-warehouse-picker--packer-torrance-linewwab80";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"lineage-logistics-warehouse-unloader-inglewood-line46gi43.md": {
	id: "lineage-logistics-warehouse-unloader-inglewood-line46gi43.md";
  slug: "lineage-logistics-warehouse-unloader-inglewood-line46gi43";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-assistant-inventory-clerk-cypress-stat596rxn.md": {
	id: "states-logistics-assistant-inventory-clerk-cypress-stat596rxn.md";
  slug: "states-logistics-assistant-inventory-clerk-cypress-stat596rxn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-assistant-receiving-clerk-whittier-statd6pm5s.md": {
	id: "states-logistics-assistant-receiving-clerk-whittier-statd6pm5s.md";
  slug: "states-logistics-assistant-receiving-clerk-whittier-statd6pm5s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-assistant-shipping-clerk-la-mirada-stat6oo4e1.md": {
	id: "states-logistics-assistant-shipping-clerk-la-mirada-stat6oo4e1.md";
  slug: "states-logistics-assistant-shipping-clerk-la-mirada-stat6oo4e1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-pallet-jack-operator-fullerton-statf2gw3m.md": {
	id: "states-logistics-pallet-jack-operator-fullerton-statf2gw3m.md";
  slug: "states-logistics-pallet-jack-operator-fullerton-statf2gw3m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-warehouse-assembler-lakewood-stathkrfwg.md": {
	id: "states-logistics-warehouse-assembler-lakewood-stathkrfwg.md";
  slug: "states-logistics-warehouse-assembler-lakewood-stathkrfwg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-warehouse-associate-south-gate-statij1ve4.md": {
	id: "states-logistics-warehouse-associate-south-gate-statij1ve4.md";
  slug: "states-logistics-warehouse-associate-south-gate-statij1ve4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-warehouse-forklift-operator-buena-park-stat5l083h.md": {
	id: "states-logistics-warehouse-forklift-operator-buena-park-stat5l083h.md";
  slug: "states-logistics-warehouse-forklift-operator-buena-park-stat5l083h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-warehouse-loader-downey-stato7cil3.md": {
	id: "states-logistics-warehouse-loader-downey-stato7cil3.md";
  slug: "states-logistics-warehouse-loader-downey-stato7cil3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-warehouse-material-handler-bellflower-statpwywtq.md": {
	id: "states-logistics-warehouse-material-handler-bellflower-statpwywtq.md";
  slug: "states-logistics-warehouse-material-handler-bellflower-statpwywtq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-warehouse-picker-&-packer-paramount-statydisxr.md": {
	id: "states-logistics-warehouse-picker-&-packer-paramount-statydisxr.md";
  slug: "states-logistics-warehouse-picker--packer-paramount-statydisxr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"states-logistics-warehouse-unloader-norwalk-statxhjuza.md": {
	id: "states-logistics-warehouse-unloader-norwalk-statxhjuza.md";
  slug: "states-logistics-warehouse-unloader-norwalk-statxhjuza";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-assistant-inventory-clerk-montebello-targuwcshm.md": {
	id: "target-assistant-inventory-clerk-montebello-targuwcshm.md";
  slug: "target-assistant-inventory-clerk-montebello-targuwcshm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-assistant-receiving-clerk-maywood-targyajvtt.md": {
	id: "target-assistant-receiving-clerk-maywood-targyajvtt.md";
  slug: "target-assistant-receiving-clerk-maywood-targyajvtt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-assistant-shipping-clerk-bell-gardens-targlhw9mn.md": {
	id: "target-assistant-shipping-clerk-bell-gardens-targlhw9mn.md";
  slug: "target-assistant-shipping-clerk-bell-gardens-targlhw9mn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-pallet-jack-operator-el-monte-targe33fb3.md": {
	id: "target-pallet-jack-operator-el-monte-targe33fb3.md";
  slug: "target-pallet-jack-operator-el-monte-targe33fb3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-warehouse-assembler-commerce-targcseba3.md": {
	id: "target-warehouse-assembler-commerce-targcseba3.md";
  slug: "target-warehouse-assembler-commerce-targcseba3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-warehouse-associate-aliso-viejo-targxxhnnj.md": {
	id: "target-warehouse-associate-aliso-viejo-targxxhnnj.md";
  slug: "target-warehouse-associate-aliso-viejo-targxxhnnj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-warehouse-forklift-operator-east-los-angeles-targzlkjjm.md": {
	id: "target-warehouse-forklift-operator-east-los-angeles-targzlkjjm.md";
  slug: "target-warehouse-forklift-operator-east-los-angeles-targzlkjjm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-warehouse-loader-rancho-santa-margarita-targs95mlu.md": {
	id: "target-warehouse-loader-rancho-santa-margarita-targs95mlu.md";
  slug: "target-warehouse-loader-rancho-santa-margarita-targs95mlu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-warehouse-material-handler-vernon-targa5i9kc.md": {
	id: "target-warehouse-material-handler-vernon-targa5i9kc.md";
  slug: "target-warehouse-material-handler-vernon-targa5i9kc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-warehouse-picker-&-packer-pico-rivera-targ8l6x0u.md": {
	id: "target-warehouse-picker-&-packer-pico-rivera-targ8l6x0u.md";
  slug: "target-warehouse-picker--packer-pico-rivera-targ8l6x0u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"target-warehouse-unloader-ladera-ranch-targo33zww.md": {
	id: "target-warehouse-unloader-ladera-ranch-targo33zww.md";
  slug: "target-warehouse-unloader-ladera-ranch-targo33zww";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"virgin-galactic-assistant-inventory-clerk-encino-virgol9c4s.md": {
	id: "virgin-galactic-assistant-inventory-clerk-encino-virgol9c4s.md";
  slug: "virgin-galactic-assistant-inventory-clerk-encino-virgol9c4s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-assembler-lake-balboa-virg35ye1d.md": {
	id: "virgin-galactic-warehouse-assembler-lake-balboa-virg35ye1d.md";
  slug: "virgin-galactic-warehouse-assembler-lake-balboa-virg35ye1d";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-associate-canoga-park-virg7rk4p7.md": {
	id: "virgin-galactic-warehouse-associate-canoga-park-virg7rk4p7.md";
  slug: "virgin-galactic-warehouse-associate-canoga-park-virg7rk4p7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-forklift-operator-westminster-virgtnjzgj.md": {
	id: "virgin-galactic-warehouse-forklift-operator-westminster-virgtnjzgj.md";
  slug: "virgin-galactic-warehouse-forklift-operator-westminster-virgtnjzgj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-loader-chatsworth-virgvrff4s.md": {
	id: "virgin-galactic-warehouse-loader-chatsworth-virgvrff4s.md";
  slug: "virgin-galactic-warehouse-loader-chatsworth-virgvrff4s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-material-handler-reseda-virgddq05z.md": {
	id: "virgin-galactic-warehouse-material-handler-reseda-virgddq05z.md";
  slug: "virgin-galactic-warehouse-material-handler-reseda-virgddq05z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-picker-&-packer-granada-hills-virgffw59x.md": {
	id: "virgin-galactic-warehouse-picker-&-packer-granada-hills-virgffw59x.md";
  slug: "virgin-galactic-warehouse-picker--packer-granada-hills-virgffw59x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"virgin-galactic-warehouse-unloader-van-nuys-virg0zq0nq.md": {
	id: "virgin-galactic-warehouse-unloader-van-nuys-virg0zq0nq.md";
  slug: "virgin-galactic-warehouse-unloader-van-nuys-virg0zq0nq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
};
"posts": {
"allen-architects-urgent-need.md": {
	id: "allen-architects-urgent-need.md";
  slug: "allen-architects-urgent-need";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"amarillo-mechanics-urgent-need.md": {
	id: "amarillo-mechanics-urgent-need.md";
  slug: "amarillo-mechanics-urgent-need";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"arlington-customer-service-openings.md": {
	id: "arlington-customer-service-openings.md";
  slug: "arlington-customer-service-openings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"austin-web-developers-hiring.md": {
	id: "austin-web-developers-hiring.md";
  slug: "austin-web-developers-hiring";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"baytown-receptionists-jobs.md": {
	id: "baytown-receptionists-jobs.md";
  slug: "baytown-receptionists-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"beaumont-truck-drivers-hiring.md": {
	id: "beaumont-truck-drivers-hiring.md";
  slug: "beaumont-truck-drivers-hiring";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"brownsville-warehouse-workers-join.md": {
	id: "brownsville-warehouse-workers-join.md";
  slug: "brownsville-warehouse-workers-join";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bryan-baristas-jobs.md": {
	id: "bryan-baristas-jobs.md";
  slug: "bryan-baristas-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"carrollton-dental-hygienists-jobs.md": {
	id: "carrollton-dental-hygienists-jobs.md";
  slug: "carrollton-dental-hygienists-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"college-station-lab-technicians-apply.md": {
	id: "college-station-lab-technicians-apply.md";
  slug: "college-station-lab-technicians-apply";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"corpus-christi-data-analysts-join.md": {
	id: "corpus-christi-data-analysts-join.md";
  slug: "corpus-christi-data-analysts-join";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dallas-commercial-electrician-staffing.md": {
	id: "dallas-commercial-electrician-staffing.md";
  slug: "dallas-commercial-electrician-staffing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"denton-real-estate-agents-jobs.md": {
	id: "denton-real-estate-agents-jobs.md";
  slug: "denton-real-estate-agents-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"edinburg-translators-jobs.md": {
	id: "edinburg-translators-jobs.md";
  slug: "edinburg-translators-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"el-paso-software-engineer-roles.md": {
	id: "el-paso-software-engineer-roles.md";
  slug: "el-paso-software-engineer-roles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"flower-mound-videographers-urgent-need.md": {
	id: "flower-mound-videographers-urgent-need.md";
  slug: "flower-mound-videographers-urgent-need";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fort-worth-teachers-apply.md": {
	id: "fort-worth-teachers-apply.md";
  slug: "fort-worth-teachers-apply";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"frisco-it-support-staff-search.md": {
	id: "frisco-it-support-staff-search.md";
  slug: "frisco-it-support-staff-search";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"garland-restaurant-chefs-hiring.md": {
	id: "garland-restaurant-chefs-hiring.md";
  slug: "garland-restaurant-chefs-hiring";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"grand-prairie-security-guards-jobs.md": {
	id: "grand-prairie-security-guards-jobs.md";
  slug: "grand-prairie-security-guards-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"harlingen-cooks-urgent-need.md": {
	id: "harlingen-cooks-urgent-need.md";
  slug: "harlingen-cooks-urgent-need";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"houston-marketing-careers.md": {
	id: "houston-marketing-careers.md";
  slug: "houston-marketing-careers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"irving-logistics-coordinators-apply.md": {
	id: "irving-logistics-coordinators-apply.md";
  slug: "irving-logistics-coordinators-apply";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"killeen-pharmacy-technicians-join.md": {
	id: "killeen-pharmacy-technicians-join.md";
  slug: "killeen-pharmacy-technicians-join";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"laredo-project-managers-now.md": {
	id: "laredo-project-managers-now.md";
  slug: "laredo-project-managers-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"league-city-security-officers-jobs.md": {
	id: "league-city-security-officers-jobs.md";
  slug: "league-city-security-officers-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"longview-mechanics-helpers-urgent-need.md": {
	id: "longview-mechanics-helpers-urgent-need.md";
  slug: "longview-mechanics-helpers-urgent-need";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lubbock-accounting-staff-available.md": {
	id: "lubbock-accounting-staff-available.md";
  slug: "lubbock-accounting-staff-available";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mckinney-construction-workers-hiring.md": {
	id: "mckinney-construction-workers-hiring.md";
  slug: "mckinney-construction-workers-hiring";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mesquite-healthcare-aides-openings.md": {
	id: "mesquite-healthcare-aides-openings.md";
  slug: "mesquite-healthcare-aides-openings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"midland-civil-engineers-urgent-need.md": {
	id: "midland-civil-engineers-urgent-need.md";
  slug: "midland-civil-engineers-urgent-need";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mission-fitness-trainers-join.md": {
	id: "mission-fitness-trainers-join.md";
  slug: "mission-fitness-trainers-join";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"north-richland-hills-illustrators-jobs.md": {
	id: "north-richland-hills-illustrators-jobs.md";
  slug: "north-richland-hills-illustrators-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"odessa-paralegals-now.md": {
	id: "odessa-paralegals-now.md";
  slug: "odessa-paralegals-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pasadena-electricians-apprenticeship.md": {
	id: "pasadena-electricians-apprenticeship.md";
  slug: "pasadena-electricians-apprenticeship";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pearland-welders-urgent-need.md": {
	id: "pearland-welders-urgent-need.md";
  slug: "pearland-welders-urgent-need";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pharr-graphic-designers-jobs.md": {
	id: "pharr-graphic-designers-jobs.md";
  slug: "pharr-graphic-designers-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"plano-sales-representatives-search.md": {
	id: "plano-sales-representatives-search.md";
  slug: "plano-sales-representatives-search";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"richardson-software-testers-search.md": {
	id: "richardson-software-testers-search.md";
  slug: "richardson-software-testers-search";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"round-rock-event-planners-join.md": {
	id: "round-rock-event-planners-join.md";
  slug: "round-rock-event-planners-join";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"san-angelo-delivery-drivers-join.md": {
	id: "san-angelo-delivery-drivers-join.md";
  slug: "san-angelo-delivery-drivers-join";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"san-antonio-nurses-jobs.md": {
	id: "san-antonio-nurses-jobs.md";
  slug: "san-antonio-nurses-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sugar-land-administrative-assistants-available.md": {
	id: "sugar-land-administrative-assistants-available.md";
  slug: "sugar-land-administrative-assistants-available";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"temple-editors-join.md": {
	id: "temple-editors-join.md";
  slug: "temple-editors-join";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-woodlands-retail-staff-hiring.md": {
	id: "the-woodlands-retail-staff-hiring.md";
  slug: "the-woodlands-retail-staff-hiring";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tyler-landscape-workers-join.md": {
	id: "tyler-landscape-workers-join.md";
  slug: "tyler-landscape-workers-join";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"victoria-musicians-join.md": {
	id: "victoria-musicians-join.md";
  slug: "victoria-musicians-join";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"waco-financial-analysts-now.md": {
	id: "waco-financial-analysts-now.md";
  slug: "waco-financial-analysts-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"warehouse-job-description.md": {
	id: "warehouse-job-description.md";
  slug: "warehouse-job-description";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"warehouse-jobs-near-me.md": {
	id: "warehouse-jobs-near-me.md";
  slug: "warehouse-jobs-near-me";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"warehouse-safety-tips.md": {
	id: "warehouse-safety-tips.md";
  slug: "warehouse-safety-tips";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"warehouse-worker-duties.md": {
	id: "warehouse-worker-duties.md";
  slug: "warehouse-worker-duties";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"warehouse-worker-skills.md": {
	id: "warehouse-worker-skills.md";
  slug: "warehouse-worker-skills";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wichita-falls-janitors-jobs.md": {
	id: "wichita-falls-janitors-jobs.md";
  slug: "wichita-falls-janitors-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};
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

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
