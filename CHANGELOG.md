# Changelog Generator

This is a tool for automatically generating a changelog from Git commit history, formatted for Mintlify using the `Update` component.

## Quick Start

Run the generator to create or update the changelog:

```bash
# Using npm script
npm run changelog

# Or direct node execution
node changelog-generator.js
```

This will generate or update the file at `docs/changelog.mdx` with your Git commit history, formatted with the Mintlify Update component.

> **Note:** The changelog is automatically generated when you run `npm run dev` thanks to the `predev` script.

## Documentation

For detailed documentation on how to use and customize the changelog generator, see the [Generator Documentation](doc-generators/README.md).

## Features

- Automatically extracts commit information from Git
- Groups commits by date
- Creates semantic version numbers based on dates
- Formats commits using conventional commit types (feat, fix, docs, etc.)
- Generates tags for filtering in Mintlify
- Links commit hashes to GitHub

## Example Output

The generator will create entries like this:

```mdx
<Update label="2023-10-15" description="v23.10.15" tags={["Feature", "Documentation"]}>
## Changes

- **Feature**: Added new authentication provider
- **Documentation**: Updated installation instructions

</Update>
```

Which renders as a beautiful changelog page in Mintlify. 