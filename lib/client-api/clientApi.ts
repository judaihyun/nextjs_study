import { AnalysisResult } from "@/types/types";
import { fetchWithAuth } from "@/lib/client-api/fetchWithAuth";

const analysisGuide = (signal: AbortSignal) =>
    fetchWithAuth<AnalysisResult>("/fake/analysis", { method: "GET", signal });

const sqlGeneration = (signal: AbortSignal) =>
    fetchWithAuth<AnalysisResult>("/fake/sql", {
        method: "GET",
        params: { id: 1 },
        signal
    });

const insights = (signal: AbortSignal) =>
    fetchWithAuth<AnalysisResult>("/fake/insights", { method: "GET", signal });

type ExampleReq = {
    name: string;
};
const example = (req: ExampleReq) =>
    fetchWithAuth<any>("/fake/test", {
        method: "POST",
        body: req
    });
export default { analysisGuide, sqlGeneration, insights, example };
