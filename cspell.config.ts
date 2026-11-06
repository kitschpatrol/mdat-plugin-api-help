import { cspellConfig } from '@kitschpatrol/cspell-config'

export default cspellConfig({
	ignorePaths: ['**/changelog.md'],
	// Heading anchors asserted in tests
	words: [
		'chagent',
		'factoryt',
		'greetingoptions',
		'greetingresult',
		'thingslist',
		'thingsthingoptions',
	],
})
