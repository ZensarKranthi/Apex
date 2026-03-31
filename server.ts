import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Mock Agentic AI Logic
const generateMockBrief = (clientId: string) => {
  return {
    id: `brief-${Date.now()}`,
    clientId,
    clientName: "Alistair Montgomery-Smythe",
    overallConfidence: 88,
    sections: {
      summary: {
        content: "Portfolio performance remains robust with a 12.4% YTD return, primarily driven by overweight positions in US Technology and European Luxury sectors. Strategic rebalancing is recommended to align with the updated IPS risk profile.",
        confidence: 92,
        citations: ["SimCorp Portfolio Extract (2026-03-25)", "IPS v4.2"]
      },
      portfolio: {
        content: "Current holdings show a 6.2% drift from target allocation in Fixed Income. Liquidity profile remains high (85% within T+2). Attribution analysis indicates strong alpha from NVIDIA and LVMH holdings.",
        confidence: 95,
        citations: ["SimCorp Dimension Performance Report", "Asset Allocation Matrix"]
      },
      market: {
        content: "Macro outlook: ECB expected to maintain rates; US tech earnings season showing resilience. Recommended talking point: Impact of potential UK tax changes on offshore trust structures.",
        confidence: 84,
        citations: ["Bloomberg Market Intelligence", "FactSet Economic Calendar"]
      },
      client: {
        content: "Recent life event: Daughter's graduation in June. Previous note: Expressed interest in sustainable aviation fuel (SAF) investments. Commitment: Review philanthropic foundation setup.",
        confidence: 78,
        citations: ["Salesforce FSC Interaction Note", "DMS Transcript (2026-02-10)"]
      },
      compliance: {
        content: "Suitability flag: Concentrated position in LVMH (>15%). MiFID II cost disclosure required for proposed rebalancing. IPS update due in 30 days.",
        confidence: 98,
        citations: ["T24 Compliance Engine", "MiFID II Rulebook"]
      }
    }
  };
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/generate-brief", async (req, res) => {
    const { clientId } = req.body;
    // Simulate Agentic Orchestration delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    const brief = generateMockBrief(clientId || "C-12345");
    res.json(brief);
  });

  app.post("/api/save-brief", (req, res) => {
    const { brief } = req.body;
    // In a real app, this would save to a database
    res.json({ status: "success", briefId: brief.id });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
