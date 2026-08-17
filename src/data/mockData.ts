export const systemHealth = {
  status: "healthy",
  uptime_pct: 99.98,
  last_incident: "2 days ago",
  latency_ms: 45,
  accuracy_pct: 94.2
};

export const sourcesData = [
  { id: "src-1", type: "document", name: "Internal Wiki", status: "live", last_synced: "10 mins ago", record_count: 14500, health: "healthy" },
  { id: "src-2", type: "database", name: "Customer DB (Postgres)", status: "live", last_synced: "2 hours ago", record_count: 2300000, health: "healthy" },
  { id: "src-3", type: "api", name: "Salesforce CRM", status: "syncing", last_synced: "Currently syncing...", record_count: 85000, health: "healthy" },
  { id: "src-4", type: "document", name: "Legal Contracts", status: "error", last_synced: "1 day ago", record_count: 4200, health: "error", error_log: "Authentication failed. Token expired." },
  { id: "src-5", type: "communication", name: "Slack (Engineering)", status: "live", last_synced: "5 mins ago", record_count: 1250000, health: "healthy" }
];

export const pipelineStages = [
  { stage: "Ingestion", throughput: "450 req/s", queueDepth: 120, errorRate: "0.01%", avgTime: "12ms", status: "active" },
  { stage: "Indexing", throughput: "200 doc/s", queueDepth: 850, errorRate: "0.05%", avgTime: "145ms", status: "active" },
  { stage: "Semantic Processing", throughput: "150 doc/s", queueDepth: 45, errorRate: "0.1%", avgTime: "320ms", status: "active" },
  { stage: "Contextual Retrieval", throughput: "85 qry/s", queueDepth: 0, errorRate: "0.00%", avgTime: "45ms", status: "active" },
  { stage: "AI Memory Layer", throughput: "120 ops/s", queueDepth: 0, errorRate: "0.00%", avgTime: "8ms", status: "active" },
  { stage: "Agent Interaction", throughput: "60 msg/s", queueDepth: 2, errorRate: "0.2%", avgTime: "850ms", status: "active" }
];

export const recentActivity = [
  { id: 1, type: "retrieval", message: "Agent 'SupportBot' queried 'refund policy'", time: "Just now", status: "success" },
  { id: 2, type: "ingestion", message: "Batch indexing 500 documents from Wiki", time: "2 mins ago", status: "processing" },
  { id: 3, type: "agent", message: "Agent 'DataAnalyst' session started", time: "15 mins ago", status: "success" },
  { id: 4, type: "error", message: "Failed to connect to Salesforce CRM", time: "1 hour ago", status: "error" },
  { id: 5, type: "retrieval", message: "Agent 'HR-Assistant' queried 'leave policy 2026'", time: "3 hours ago", status: "success" }
];

export const agentsData = [
  { id: "agt-1", name: "SupportBot-v2", integration_type: "Customer Support", active_context_size: "128k tokens", last_active: "2 mins ago", session_count: 1450, status: "active" },
  { id: "agt-2", name: "Internal-HR-Assistant", integration_type: "Employee Portal", active_context_size: "32k tokens", last_active: "5 mins ago", session_count: 340, status: "active" },
  { id: "agt-3", name: "Sales-Copilot", integration_type: "CRM Integration", active_context_size: "64k tokens", last_active: "1 hour ago", session_count: 890, status: "idle" },
  { id: "agt-4", name: "CodeBase-Oracle", integration_type: "Developer Tools", active_context_size: "256k tokens", last_active: "Just now", session_count: 2100, status: "active" }
];

export const accuracyChartData = [
  { time: "00:00", accuracy: 92, latency: 45 },
  { time: "04:00", accuracy: 94, latency: 42 },
  { time: "08:00", accuracy: 93, latency: 48 },
  { time: "12:00", accuracy: 96, latency: 40 },
  { time: "16:00", accuracy: 95, latency: 44 },
  { time: "20:00", accuracy: 97, latency: 38 },
  { time: "24:00", accuracy: 95, latency: 45 }
];

export const usageTrendsData = [
  { day: "Mon", queries: 12000, storageGB: 450 },
  { day: "Tue", queries: 14500, storageGB: 455 },
  { day: "Wed", queries: 13200, storageGB: 462 },
  { day: "Thu", queries: 18000, storageGB: 475 },
  { day: "Fri", queries: 16500, storageGB: 480 },
  { day: "Sat", queries: 8000, storageGB: 482 },
  { day: "Sun", queries: 7500, storageGB: 485 }
];
