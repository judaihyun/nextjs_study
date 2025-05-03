import { AnalysisResult } from "@/types/types";
import { fetchWithAuth } from "@/lib/client-api/fetchWithAuth";

const analysisGuide = (signal: AbortSignal) =>
    fetchWithAuth<AnalysisResult>("/fake/analysis", { method: "GET" }, signal);

const sqlGeneration = (signal: AbortSignal) =>
    fetchWithAuth<AnalysisResult>("/fake/sql", { method: "GET" }, signal);

const insights = (signal: AbortSignal) =>
    fetchWithAuth<AnalysisResult>("/fake/insights", { method: "GET" }, signal);

export default { analysisGuide, sqlGeneration, insights };
