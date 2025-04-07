import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class AdditionAgent extends McpAgent {
  server = new McpServer({
    name: "Addition Server",
    version: "1.0.0",
  });
  
  async init(): Promise<void> {
    // Register a tool that adds two numbers
    this.server.tool(
      "add", 
      { 
        a: z.number().describe("First number to add"),
        b: z.number().describe("Second number to add")
      }, 
      async ({ a, b }) => {
        const sum = a + b;
        return {
          content: [{ type: "text", text: String(sum) }],
        };
      }
    );
  }
} 