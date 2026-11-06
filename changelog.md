# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.2] - 2026-11-01

### Documentation

- Clarify that `setLogger()` accepts streams with a `write` method.

### Maintenance

- Update declared runtime requirements for lognow, typedoc-plugin-markdown, and Zod.
- Refresh development dependencies and pnpm, including shared-config, mdat, tsdown, and Vitest, and adjust contributor tooling compatibility settings.
- Build package outputs before running `lint` and `fix`.
- Replace the `skills` prepare hook with pnpm-managed skill synchronization for shared-config and mdat.
- Refresh CI and release actions and change automated dependency maintenance from weekly to monthly.
- Make link checks ignore loopback URLs and succeed when no links are found.

## [0.3.1] - 2026-10-07

### Documentation

- Document the exact Node.js and peer dependency requirements and generate installation guidance from package metadata.

### Maintenance

- Raise the declared lognow runtime requirement to `^0.8.5`.
- Refresh shared-config, mdat, and pnpm, and simplify ESLint and TypeScript configuration.
- Add automatic contributor skill synchronization through the package's `prepare` script.
- Add a weekly and manually triggered GitHub Actions workflow for dependency maintenance.

## [0.3.0] - 2026-10-04

### Added

- Add `api-help` as the primary mdat rule, retaining `api` as an alias.
- Add a `heading` option to customize or suppress the generated section heading.

### Changed

- **Breaking:** Rename the npm package from `mdat-plugin-api` to `mdat-plugin-api-help`, changing installation and import paths.
- **Breaking:** Rename the exported `ApiRuleOptions` type to `ApiHelpRuleOptions`.
- **Breaking:** Emit an `API` section heading by default; `headingLevel` now controls that heading, defaults to 4 instead of 3, and places generated headings one level below it even when the section heading is suppressed.

### Documentation

- Update installation, imports, placeholder examples, and the API reference for the package rename and heading options.

### Maintenance

- Update development dependencies, including shared-config, mdat, and Vitest.

## [0.2.0] - 2026-09-28

### Added

- Add the `api` mdat rule for generating Markdown from TypeScript public exports, with a default plugin export and public `ApiRuleOptions` type.
- Provide full documentation with typed signatures, JSDoc descriptions, parameter/property tables, and dedented examples, omitting redundant signature-only sections and private, protected, or `@internal` members.
- Provide a compact format with tables of signatures, return types or definitions, and summary descriptions, expanding object types one level deep.
- Render namespaces as nested sections, with qualified member headings and in-document type links in the full format.
- Support wildcard `include`/`exclude` filters and whole-namespace selection; document default exports under their declared names while also matching them as `default`.
- Support configurable TypeDoc sorting, optional kind grouping, and heading levels starting at 3 by default, with headings deeper than six rendered as bold text.
- Resolve entry points from package metadata or conventional source paths, map build outputs back to source across platforms, and accept explicit entry-point and tsconfig paths.
- Validate options with readable errors, report missing entry points or tsconfig files and empty APIs, and warn when include patterns match nothing.
- Expose `setLogger()` for custom logger injection and route TypeDoc messages through the library logger, with informational and validation output at debug level.
- Ship `mdat-plugin-api` as an ESM package with TypeScript declarations, requiring mdat 3, TypeScript 5 or 6, and Node.js `^24.16.0 || >=26.3.0`.

### Documentation

- Add installation and configuration guidance, live full and compact examples, and references for options, export selection, namespaces, entry-point resolution, and logging.

### Maintenance

- Establish builds, linting, tests, cross-platform CI, link checks, and release automation, with refreshed runtime and development dependencies.

[0.2.0]: https://github.com/kitschpatrol/mdat-plugin-api-help/releases/tag/v0.2.0
[0.3.0]: https://github.com/kitschpatrol/mdat-plugin-api-help/compare/v0.2.0...v0.3.0
[0.3.1]: https://github.com/kitschpatrol/mdat-plugin-api-help/compare/v0.3.0...v0.3.1
[0.3.2]: https://github.com/kitschpatrol/mdat-plugin-api-help/compare/v0.3.1...v0.3.2
