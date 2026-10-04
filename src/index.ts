import type { Rule } from 'mdat'
import type { SortStrategy } from 'typedoc'
import { defineConfig } from 'mdat'
import path from 'node:path'
import { z } from 'zod'
import { getApiMarkdown } from './utilities/get-api-markdown'
import { resolveEntryPoint } from './utilities/resolve-entry-point'
export { setLogger } from './utilities/log'

const DEFAULT_HEADING = 'API'

/**
 * Options for the `<!-- api-help -->` rule.
 *
 * Pass them as a JSON5 object in the placeholder comment, e.g. `<!-- api-help({
 * format: 'compact', include: ['greet', '*Options'] }) -->`.
 */
export type ApiHelpRuleOptions = {
	/**
	 * Path to the TypeScript entry point, relative to the working directory. When
	 * omitted, it's inferred from `package.json` (`exports`, `types`, `main`,
	 * `module`), mapping build output like `./dist/index.js` back to
	 * `./src/index.ts`, and finally from common defaults like `src/index.ts`.
	 */
	entryPoint?: string
	/**
	 * Names of top-level exports to leave out. Supports `*` wildcards, e.g.
	 * `['setLogger', 'default*']`. Applied after `include`.
	 */
	exclude?: string[]
	/**
	 * Output style. `full` documents every export completely: signatures,
	 * parameter and property tables, and examples. `compact` renders one table
	 * row per export, with a subsection per namespace.
	 *
	 * @defaultValue 'full'
	 */
	format?: 'compact' | 'full'
	/**
	 * Group exports under Functions, Classes, Type Aliases, etc. headings. When
	 * `false`, exports are listed together in `sort` order.
	 *
	 * @defaultValue true
	 */
	groupByKind?: boolean
	/**
	 * Section heading above the generated documentation. `true` emits an "API"
	 * heading, `false` leaves the heading out, and a string replaces the heading
	 * text.
	 *
	 * @defaultValue true
	 */
	heading?: boolean | string
	/**
	 * Heading level for the section heading (1–6). Generated headings are nested
	 * below it, whether or not the section heading is shown. Nested headings that
	 * would exceed level 6 are rendered as bold text. The default suits placement
	 * under a level-three "Library" section, as in mdat's readme template.
	 *
	 * @defaultValue 4
	 */
	headingLevel?: number
	/**
	 * Names of top-level exports to document. Supports `*` wildcards, e.g.
	 * `['greet', '*Options']`. A namespace is included with all of its members.
	 * Everything is documented when omitted.
	 */
	include?: string[]
	/**
	 * [TypeDoc sort
	 * strategies](https://typedoc.org/documents/Options.Organization.html#sort)
	 * applied to members, in priority order. `source-order` and `alphabetical`
	 * are the useful ones for a readme; `kind`, `static-first`, `instance-first`,
	 * `visibility`, and `required-first` also affect class and interface
	 * members.
	 *
	 * @defaultValue ['source-order']
	 */
	sort?: SortStrategy[]
	/**
	 * Path to a `tsconfig.json`, relative to the working directory. TypeDoc finds
	 * the nearest one when omitted.
	 */
	tsconfig?: string
}

const SORT_STRATEGIES = [
	'source-order',
	'alphabetical',
	'alphabetical-ignoring-documents',
	'enum-value-ascending',
	'enum-value-descending',
	'enum-member-source-order',
	'static-first',
	'instance-first',
	'visibility',
	'required-first',
	'kind',
	'external-last',
	'documents-first',
	'documents-last',
] as const satisfies readonly SortStrategy[]

const optionsSchema = z.strictObject({
	entryPoint: z.string().optional(),
	exclude: z.array(z.string()).default([]),
	format: z.enum(['compact', 'full']).default('full'),
	groupByKind: z.boolean().default(true),
	heading: z.union([z.boolean(), z.string().trim().min(1)]).default(true),
	headingLevel: z.number().int().min(1).max(6).default(4),
	include: z.array(z.string()).default([]),
	sort: z.array(z.enum(SORT_STRATEGIES)).default(['source-order']),
	tsconfig: z.string().optional(),
})

const apiHelpRule: Rule = {
	async content(options) {
		const parsed = optionsSchema.safeParse(options ?? {})
		if (!parsed.success) {
			throw new Error(
				`Invalid options for the <!-- api-help --> rule:\n${z.prettifyError(parsed.error)}`,
			)
		}

		const { entryPoint, heading, headingLevel, tsconfig, ...rest } = parsed.data

		// Generated headings sit one level below the section heading, whether or
		// not the section heading is shown
		const apiMarkdown = await getApiMarkdown({
			...rest,
			entryPoint: await resolveEntryPoint(entryPoint),
			headingLevel: headingLevel + 1,
			...(tsconfig !== undefined && { tsconfig: path.resolve(tsconfig) }),
		})

		if (heading === false) {
			return apiMarkdown
		}

		const headingText = heading === true ? DEFAULT_HEADING : heading
		return `${'#'.repeat(headingLevel)} ${headingText}\n\n${apiMarkdown}`
	},
}

/**
 * Mdat plugin that generates API documentation from TypeScript source files.
 *
 * Uses TypeDoc to extract JSDoc descriptions, type signatures, `@example`
 * blocks, and parameter tables from a package's public exports.
 *
 * Register it in your `mdat.config.ts`, then add `<!-- api-help -->`
 * placeholder comments to your Markdown files. The rule is also aliased as
 * `<!-- api -->`.
 *
 * @example
 * 	import { defineConfig } from 'mdat'
 * 	import apiHelpPlugin from 'mdat-plugin-api-help'
 *
 * 	export default defineConfig({
 * 		...apiHelpPlugin,
 * 	})
 */
const apiHelpPlugin = defineConfig({ api: apiHelpRule, 'api-help': apiHelpRule })

export default apiHelpPlugin
