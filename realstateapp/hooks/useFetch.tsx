// hooks/useFetch.ts
import { useEffect, useState } from "react";
import api from "@/utils/api";
import type { Property } from "@/types/Property";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Simple in-memory cache
 */
const cache: Record<string, any> = {};

/**
 * Generic data fetcher hook.
 */
export function useFetch<T = any>(
  endpoint: string,
  autoFetch = true,
  initialData?: T
) {
  const [state, setState] = useState<FetchState<T>>({
    data: initialData || (cache[endpoint] ?? null),
    loading: !initialData && autoFetch && !cache[endpoint],
    error: null,
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const res = await api.get<T>(endpoint);
      cache[endpoint] = res.data; // save to cache
      setState({ data: res.data, loading: false, error: null });
    } catch (err: any) {
      setState({
        data: null,
        loading: false,
        error: err.message || "Failed to fetch",
      });
    }
  };

  useEffect(() => {
    if (autoFetch && !state.data) {
      fetchData();
    }
  }, [endpoint]);

  return { ...state, refetch: fetchData };
}

/**
 * Fetch all properties
 */
export function useProperties() {
  return useFetch<Property[]>("/properties/");
}

/**
 * Fetch single property details by ID
 * Supports initialData/preview to show instantly without loading spinner
 */
export function usePropertyDetail(
  id?: string | number,
  options?: { initialData?: Property }
) {
  const endpoint = id ? `/properties/${id}/` : "";
  return useFetch<Property>(endpoint, !!id, options?.initialData);
}

/**
 * Example: fetch user profile (already authenticated)
 */
export function useUserProfile() {
  return useFetch("/me/");
}
