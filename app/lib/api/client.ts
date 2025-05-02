import { AnalysisResult } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const client = {
    analysisGuide: async (signal: AbortSignal): Promise<AnalysisResult> => {
        const response = await fetch(`${BASE_URL}/api/analysis-guide`, {
            signal,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return {
            data: data.message,
            delay: data.delay
        };
    },

    sqlGeneration: async (signal: AbortSignal): Promise<AnalysisResult> => {
        const response = await fetch(`${BASE_URL}/api/sql-generation`, {
            signal,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return {
            data: data.message,
            delay: data.delay
        };
    },

    insights: async (signal: AbortSignal): Promise<AnalysisResult> => {
        const response = await fetch(`${BASE_URL}/api/insights`, {
            signal,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return {
            data: data.message,
            delay: data.delay
        };
    }
};

export default client;
