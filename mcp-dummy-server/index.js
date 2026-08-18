import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server instance
const server = new McpServer({
  name: "Dummy Server",
  version: "1.0.0"
});

// Add an 'echo' tool
server.tool("echo",
  "Echoes back the user's input",
  {
    message: z.string().describe("The message to echo")
  },
  async ({ message }) => {
    return {
      content: [{ type: "text", text: `Dummy server says: ${message}` }]
    };
  }
);

// Add a 'get_random_number' tool
server.tool("get_random_number",
  "Returns a random number between a minimum and maximum value",
  {
    min: z.number().describe("Minimum value"),
    max: z.number().describe("Maximum value")
  },
  async ({ min, max }) => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return {
      content: [{ type: "text", text: `Your random number is: ${num}` }]
    };
  }
);

// Start the server using stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Dummy MCP Server running on stdio");
}

main().catch(console.error);
