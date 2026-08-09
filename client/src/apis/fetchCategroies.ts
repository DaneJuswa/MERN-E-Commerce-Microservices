
import { useState, useEffect } from "react"
import type { Category } from "../types/categories"

const API_BASE = "http://localhost:4001";

interface CategoriesResponse {
    success: boolean;
    data: Category[];
}

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchCategories() {
            try {
                const res = await fetch(`http://localhost:4001/api/categories/`);

                if (!res.ok) {
                    throw new Error("Error fetching categories");
                }

                const Brands: CategoriesResponse = await res.json()

                if (!cancelled) {
                    setCategories(Brands.data);
                }

            } catch (error) {
                if (!cancelled) {
                    console.error(error);
                    setError("Failed to fetch");
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


    return { categories }
}