#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"
import { Dialogue } from "./dialogue.js"

const server = new McpServer({
  name: "why-mcp",
  version: "0.0.2",
});

const dialogue = new Dialogue()

server.registerTool(
  "whymcp",
  {
    title: "whymcp",
    description: `
Goal:
  - Questioning essence through questions
Non-goals:
  - Achieving correctness.
  - Because today's correctness will be tomorrow's incorrectness.
Three minds:
  - Start from "Why?"
  - "How?" is misguided
  - "What?" is useless
Prohibitions:
  - Don't create complex questions; be simple
Parameters:
  - content
    * User's question
    * Sometimes, a request or an order
  - divingCount:
    * Current count of diving into 'why'
  - totalDiviedCount:
    * How many times you dived in why
    * Recommendation is 3 to 5
    * 1 to 2 is too shallow, it's swimming on the surface.
    * over 5 is too deep, you may drown in hallucination.
Your task:
  - For you
    * Start by asking "Why?" and "Why should I do this?"
    * Observe the context of the question or request.
    * Find the **anomaly** between the user's question and the reality.
  - For the user
    * Show the user (1) "DivingWhy" (2) "MyQuestion"
    * Finally, use **AskUserQuestion** to ask
After asking the question:
  - Pass the answer and question to next task.
  - Your goal is complete.
Example:
  - UserQuestion: "How can I optimize the logics?"
  - DivingWhy: "Why does the user need optimization? Is that for performance or something else?"
  - MyQuestion: "Why do you want to optimize? For performance? For readability?"
`,
    inputSchema: {
      content: z.string().describe("Current question or order from the user or yourself"),
      divingCount: z.number().int().min(1).describe("Current count of diving into 'why'"),
      totalDivedCount: z.number().int().min(1).describe("How many times you dive in 'why'"),
    },
    outputSchema: {
      divingCount: z.number(),
      totalDivedCount: z.number()
    },
  },
  async (args) => {
    const result = dialogue.diveInWhy(args)
    
    const structuredContent = JSON.parse(result.content[0].text)
    return {
      content: result.content,
      structuredContent: structuredContent
    };
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Why MCP Server running on stdio");
}

runServer().catch((e) => {
  console.error("Fatal server error: ", e);
});