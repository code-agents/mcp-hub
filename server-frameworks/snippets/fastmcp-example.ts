import { FastMCP } from "fastmcp";
import { z } from "zod";

// Create a server instance
const server = new FastMCP({
  name: "Addition Server",
  version: "1.0.0",
});

// Define and register a tool that adds two numbers
server.addTool({
  name: "add",
  description: "Add two numbers together",
  parameters: z.object({
    a: z.number().describe("First number to add"),
    b: z.number().describe("Second number to add"),
  }),
  execute: async (args: { a: number; b: number }): Promise<string> => {
    const sum = args.a + args.b;
    return String(sum);
  },
});

// Start the server with stdio transport
server.start({
  transportType: "stdio",
}); 