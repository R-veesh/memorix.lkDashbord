# Memorix — Dashboard Master Plan
**Enterprise AI Memory & Retrieval Platform · Knowledge Operations Center**

> Note: memorix.lk currently resolves to a minimal/placeholder page (meta title "Memorix — Enterprise AI Memory & Retrieval Platform," description "AI Brain Core & Decentralized Memory Layer"). No live UI could be scanned, so this plan is built from the BA scope report and standard patterns for enterprise AI ops dashboards. Once the site is live, screens can be validated against it.

---

## 1. Vision Statement

The Memorix dashboard is the **product itself** — a Knowledge Operations Center where enterprise teams see, in real time, how their organizational knowledge is ingested, indexed, retrieved, and served to AI agents. It should feel like mission control for enterprise memory: dense with signal, dark-themed, fast, and trustworthy at a glance.

Design pillars from the BA report: **Context, Intelligence, Accuracy, Security, Scalability.**

---

## 2. Dashboard Information Architecture

Three structural widgets from the BA report map directly to three dashboard zones:

| Zone | BA Widget | Purpose |
|---|---|---|
| **Sources** | Widget A – Input Layer | Connect & manage knowledge sources |
| **Pipeline** | Widget B – Memory & Retrieval Process | Visualize the ingestion → retrieval flow |
| **Operations** | Widget C – Knowledge Ops Dashboard | Monitor live system health & performance |

### Proposed Navigation (left sidebar)

1. **Overview** — top-level KPIs, system health, alerts
2. **Sources** — connected knowledge sources, connection status
3. **Pipeline** — ingestion/indexing visual workflow, job queue
4. **Retrieval** — search/retrieval activity, accuracy metrics
5. **Agents** — active AI agents, their memory/context usage
6. **Analytics** — retrieval trends, usage reports
7. **Settings** — API keys, integrations, team, security

---

## 3. Screen-by-Screen Breakdown

### 3.1 Overview (Landing screen after login)
- **Top KPI strip**: Indexed knowledge sources, total retrieval requests (24h), active AI agents, average retrieval latency, retrieval accuracy %, system health status
- **Knowledge graph mini-visual**: live node/edge preview of how knowledge is connected
- **Recent activity feed**: last N retrievals, ingestion jobs, agent sessions
- **Alerts panel**: failed syncs, degraded sources, latency spikes

### 3.2 Sources (Input Layer — Widget A)
- Grid/list of connected source types: documents, databases, knowledge bases, business apps, internal tools, communication systems, data repositories, enterprise APIs
- Per-source card: connection status (live/error/syncing), last synced, record count, health indicator
- "Add Source" flow (connector picker)
- Sync logs / error drill-down

### 3.3 Pipeline (Memory & Retrieval Process — Widget B)
- Horizontal visual pipeline: **Ingestion → Indexing → Semantic Processing → Contextual Retrieval → AI Memory Layer → Agent Interaction → Knowledge Delivery**
- Each stage shows: throughput, queue depth, error rate, avg processing time
- Click a stage to drill into logs/jobs currently in that stage
- Real-time animated flow (optional) to reinforce "living system" feel

### 3.4 Retrieval / Knowledge Ops (Widget C)
- Retrieval accuracy over time (chart)
- Search latency (p50/p95/p99)
- Context utilization (how much retrieved context agents actually use)
- Top queried topics / knowledge gaps (queries with low-confidence results)
- Relevance ranking quality metrics

### 3.5 Agents
- List of active AI agents/integrations consuming Memorix
- Per-agent: memory footprint, context retrieval frequency, conversation continuity status, last active
- Task context management view — what context an agent currently holds

### 3.6 Analytics
- Usage trends: retrieval volume, storage growth, API consumption
- Cost/usage tracking (ties to monetization: usage-based retrieval, API access tiers)
- Exportable reports for enterprise stakeholders

### 3.7 Settings
- API keys & access tokens
- Team & role management (enterprise IT / security requirement)
- Data retention & security policies
- Integration marketplace (NeMo Retriever, NIM, Triton compatibility shown here per BA report's "technical showcase" note — kept out of core positioning, but relevant in a settings/integrations context)

---

## 4. Core UI Components to Build

| Component | Used In |
|---|---|
| KPI stat card (value + delta + sparkline) | Overview, Analytics |
| Source connection card | Sources |
| Pipeline stage node (with live counters) | Pipeline |
| Knowledge graph visualization (force-directed or node-link) | Overview, Retrieval |
| Real-time activity feed/log stream | Overview, Sources |
| Agent status card | Agents |
| Line/area chart (accuracy, latency trends) | Retrieval, Analytics |
| Status badge (healthy/degraded/error) | Global, used everywhere |
| Alert/notification toast + panel | Global |

---

## 5. Visual Design System

- **Theme**: Dark enterprise AI aesthetic — deep charcoal/navy background, high-contrast data visualizations
- **Accent colors**: one primary "AI intelligence" accent (e.g., electric blue/violet) for active states, semantic status colors (green/amber/red) reserved strictly for health states
- **Typography**: technical, clean sans-serif; monospace for IDs, logs, latency numbers
- **Motifs**: knowledge graphs, node-link diagrams, subtle particle/network background textures to reinforce "memory layer" concept
- **Density**: information-dense but organized in clear cards/grids — this is an ops tool, not a marketing page

---

## 6. Data Model (Dashboard-Facing)

Minimum entities the dashboard needs from the backend:

- **Source**: id, type, name, status, last_synced, record_count, error_log
- **IngestionJob**: id, source_id, stage, started_at, completed_at, status, records_processed
- **RetrievalEvent**: id, query, agent_id, latency_ms, relevance_score, timestamp
- **Agent**: id, name, integration_type, active_context_size, last_active, session_count
- **SystemHealth**: component, status, uptime_pct, last_incident

---

## 7. Suggested Tech Stack (Dashboard Layer)

Per BA report: **AI Assist Coding** for development, **Cloudflare** for hosting/CDN.

- **Frontend**: React (component-driven, matches dashboard + landing page dual structure), Tailwind for styling velocity
- **Charts/Viz**: Recharts or D3 for graphs; a force-directed graph library for the knowledge-graph visual
- **Real-time updates**: WebSocket or SSE for live pipeline/activity feeds
- **Hosting**: Cloudflare Pages/Workers, matching existing infra choice

---

## 8. Build Phases (fits within the BA report's 6–7 working day estimate)

| Day | Focus |
|---|---|
| 1 | UI/UX design system, IA, wireframes for all 7 screens |
| 2 | Frontend shell + navigation + Overview screen |
| 3 | Sources screen + connection cards + add-source flow |
| 4 | Pipeline visualization (Widget B) — the signature visual |
| 5 | Retrieval/Analytics screens + charts |
| 6 | Agents screen + Settings + QA pass |
| 7 | Performance optimization, responsive QA, deployment |

---

## 9. Success Criteria

- Dashboard communicates "AI memory operations center" within 3 seconds of landing (per BA design intent)
- All 7 core screens responsive and functional
- Live/near-live data updates on Overview and Pipeline
- Visual clarity of the ingestion → retrieval → agent pipeline (this is the product's core differentiator per BA report's "Unique Angle")

---

## Open Questions for You
1. Do you have (or plan to have) a live backend/API for source connections and retrieval events, or should the dashboard start with mock/demo data?
2. Should I proceed to build a clickable prototype (React/HTML) of the Overview + Pipeline screens first, since those carry the most visual weight?
