# socrates mcp

## Concept
Think **why**.

## Purpose
Stop junk prompts "Create somewhat.", "Refactor it."

## Build

```
$ npm install
$ npm run build
# ./dist will be created

# test run on CLI
$ npx -y .
Socrates MCP Server running on stdio
```

## .mcp.json

```
{
  "mcpServers": {
    "socrates-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "/path/to/socrates-mcp"
      ]
    }
  }
}
```

## Required
* node >= 24 LTS

## Tested

* claude code - 2.1.12
* Mac OS X - 26.2