import Cookies from "js-cookie";

const analysisGuide = async (signal: AbortSignal) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api`;
        const token = Cookies.get("access_token");
        const res = await fetch(url + "/fake/analysis", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            signal,
            cache: "no-store" // 매번 fresh 요청
        });
        return res.json();
    } catch (e) {
        console.error("Error in analysisGuide:", e);
        throw e;
    }
};

const sqlGeneration = async (signal: AbortSignal) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api`;
        const token = Cookies.get("access_token");
        const res = await fetch(url + "/fake/sql", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            signal,
            cache: "no-store" // 매번 fresh 요청
        });
        return res.json();
    } catch (e) {
        console.error("Error in sqlGeneration:", e);
        throw e;
    }
};

const insights = async (signal: AbortSignal) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api`;
        const token = Cookies.get("access_token");
        const res = await fetch(url + "/fake/insights", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            signal,
            cache: "no-store" // 매번 fresh 요청
        });
        return res.json();
    } catch (e) {
        console.error("Error in insights:", e);
        throw e;
    }
};

export default { analysisGuide, sqlGeneration, insights };
