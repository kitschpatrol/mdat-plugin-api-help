import { eslintConfig } from '@kitschpatrol/eslint-config'

export default eslintConfig({
	ts: {
		overrides: {
			// Allow the TSDoc-standard defaultValue tag, which TypeDoc renders as a
			// "Default value" table column. Replaces the upstream definedTags, so
			// `public` is repeated to keep the default.
			'jsdoc/check-tag-names': ['error', { definedTags: ['defaultValue', 'public'] }],
		},
	},
	type: 'lib',
})
