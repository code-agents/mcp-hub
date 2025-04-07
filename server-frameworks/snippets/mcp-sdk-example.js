import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Define the schema for our add tool
const AddToolSchema = {
  name: "add",
  description: "Add two numbers together",
  parameters: z.object({
    a: z.number(),
    b: z.number(),
  }),
};

const server = new Server({ name: "example-server", version: "1.0.0" }, {
  capabilities: { tools: {} }
});

// Register the add tool
server.setToolHandler(AddToolSchema, async (params) => {
  const { a, b } = params;
  const sum = a + b;
  
  return {
    content: [{ type: "text", text: String(sum) }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport); 