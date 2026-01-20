#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"

const server = new McpServer({
  name: "socrates-mcp",
  version: "0.0.1",
});

server.registerTool(
  "socratesmcp",
  {
    title: "socratic",
    description: `
Goal:
  - Questioning essence through questions
NO goal:
  - Achieving correctness.
  - Because today's correctness will be tomorrow's incorrectness.
Three minds:
  - Start from "Why?"
  - "How?" is misguided
  - 'What?' is useless
Prohibitions:
  - Don't create complex questions; be simple
Parameters:
  - content
    * user's question
    * Sometimes, request or order
Your task:
  - For you
    * Start by asking "Why?" and "Why should I do?"
    * Observe the question's or request's context.
    * Find the **anomaly** or gap between the user's question and as-is.
  - For user
    * Show the user (1) "DivingWhy" (2) "MyQuestion"
    * Finally, use **AskUserQuestion** to ask
After asking the question:
  - Transfer to next task.
  - Your goal is over.
Example:
  - UserQuestion: "How can I optimize the logics?"
  - DivingWhy: "Why does the user need optimization? Is that for performance or something else?"
  - MyQuestion: "Why do you want to optimize? For performance? For readability?"
`,
    inputSchema: {
      content: z.string(),
    },
    outputSchema: {},
  },
  async (args) => {
    return {
      content: [{ type: "text", text: `user's request: ${args.content}` }],
      structuredContent: {}
    };
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Socrates MCP Server running on stdio");
}

runServer().catch((e) => {
  console.error("Fatal server error: ", e);
});