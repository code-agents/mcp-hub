// Assuming a project structure created with `mcp create my-server`
// File: src/tools/add.ts
import { Tool } from "mcp-framework";
import { z } from "zod";

export class Addition extends Tool {
  // Tool metadata
  name = "add";
  description = "Add two numbers together";
  
  // Define the parameters schema with zod
  parameters = z.object({
    a: z.number().describe("First number to add"),
    b: z.number().describe("Second number to add")
  });

  // Implementation of the tool
  async execute({ a, b }: { a: number; b: number }): Promise<string> {
    const sum = a + b;
    return String(sum);
  }
}

// The framework automatically discovers and registers this tool
// from the tools directory without manual registration 