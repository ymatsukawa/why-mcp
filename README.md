# why mcp

Start from **why**.

## Purpose
Stop wasting time using junk short prompt "create something good".

## Build

```
$ npm install
$ npm run build
# ./dist will be created

# test run on CLI
$ npx -y .
Why MCP Server running on stdio
```

## .mcp.json

**mcp is optimized for claude code.**

```
{
  "mcpServers": {
    "why-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "/path/to/why-mcp"
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
