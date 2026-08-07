
import { useState, useEffect } from "react"
import type { Category } from "../types/categories"
const API_BASE = "http://localhost:4001/"

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchCategories() {
            try {
                const res = await fetch(`${API_BASE}/api/categories`);

                if (!res.ok) {
                    console.log("Error fetching categories")
                }

                const data: Category[] = await res.json()

                if (!cancelled) setCategories(data);
            } catch (error) {
                if (!cancelled) {
                    console.log("Error")
                    setError("Failed to fetch")
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchCategories()
        return () => {
            cancelled = true;
        };
    }, [])


    return { categories, loading, error }
}