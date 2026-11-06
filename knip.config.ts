import { knipConfig } from '@kitschpatrol/knip-config'

export default knipConfig({
	// Loaded by TypeDoc at runtime via path strings, invisible to static analysis
	entry: ['test/assets/fixtures/**/*.ts'],
	ignoreDependencies: [
		'@kitschpatrol/chagent', // Typically invoked through bumpp's --execute argument, which Knip doesn't parse
	],
})
