# Dummy MCP Server

This is a very basic dummy MCP (Model Context Protocol) server implemented using the official `@modelcontextprotocol/sdk`. It provides two simple tools that an AI can use:
1. `echo`: Echoes back whatever string you send to it.
2. `get_random_number`: Generates a random number between a minimum and maximum value.

## How it works

The server runs via standard input/output (stdio), which is the standard way local MCP servers communicate with AI clients (like Claude Desktop, Cursor, or Antigravity).

## Testing the server

You can test that the script compiles and runs by executing:
```bash
node index.js
```
*(Note: It won't do much on its own since it expects JSON-RPC messages over standard input, but you should see "Dummy MCP Server running on stdio" in the console).*

## How to use it in an AI Client

To connect this server to your AI, you need to point your AI client's MCP configuration to this folder and tell it to run the script using Node.js.

### Example for Claude Desktop (claude_desktop_config.json)

```json
{
  "mcpServers": {
    "dummy-mcp": {
      "command": "node",
      "args": [
        "d:/PrimeOneWork/React_Project/memorix.lkDashbord/mcp-dummy-server/index.js"
      ]
    }
  }
}
```

### Example for Antigravity IDE (mcp_config.json)

```json
{
  "mcpServers": {
    "dummy-mcp": {
      "command": "node",
      "args": [
        "d:/PrimeOneWork/React_Project/memorix.lkDashbord/mcp-dummy-server/index.js"
      ]
    }
  }
}
```
