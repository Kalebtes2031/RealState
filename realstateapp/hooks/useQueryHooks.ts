// hooks/useQueryHooks.ts
import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import api from "@/utils/api";
import type { Property } from "@/types/Property";

/**
 * Low-level fetcher for Query functions.
 * Keep consistent with your API client (axios).
 */
async function fetcher<T>(url: string): Promise<T> {
  const res = await api.get<T>(url);
  return res.data;
}

/**
 * Hook: fetch all properties list
 */
export function useProperties() {
  const key = ["properties"] as const;

  return useQuery<Property[], Error>({
    queryKey: key,
    queryFn: () => fetcher<Property[]>("/properties/"),
    // query options
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    // you can add retry, refetchOnWindowFocus etc. here if needed
    // refetchOnWindowFocus: false,
    // retry: 1,
  });
}

/**
 * Hook: single property detail by id
 * Accepts initialData to show preview instantly (from list).
 *
 * id can be string | number | undefined - if falsy, query is disabled.
 */
export function usePropertyDetail(
  id?: string | number,
  options?: { initialData?: Partial<Property> | null }
) {
  const key = ["property", id] as const;

  return useQuery<Property, Error>({
    queryKey: key,
    queryFn: async () => {
      if (id === undefined || id === null) {
        // should never be called when disabled, but guard anyway
        throw new Error("Invalid property id");
      }
      return fetcher<Property>(`/properties/${id}/`);
    },
    enabled: Boolean(id),
    initialData: options?.initialData as any,
    staleTime: 1000 * 60 * 5, // 5 minutes before considered stale
    refetchOnWindowFocus: true,
  });
}

/**
 * Utility: prefetch a property detail (useful before navigation)
 * Accepts QueryClient from `useQueryClient()` or a client instance.
 */
export async function prefetchPropertyDetail(
  queryClient: QueryClient,
  id: string | number,
  previewData?: Partial<Property>
) {
  const key = ["property", id] as const;

  // If previewData is provided we can set it synchronously so UI is instant
  if (previewData) {
    queryClient.setQueryData(key, previewData);
  }

  // Prefetch and hydrate cache
  await queryClient.prefetchQuery({
    queryKey: key,
    queryFn: async () => {
      const data = await fetcher<Property>(`/properties/${id}/`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Ensure the newest data is available
  const fresh = queryClient.getQueryData<Property>(key);
  return fresh;
}

export const useFeaturedProperties = () => {
  const { data: properties, ...rest } = useProperties();

  const featured = useMemo(() => {
    if (!properties) return [];

    return properties.filter((p) => {
      if (!p.reviews || p.reviews.length === 0) return false;

      // OPTION 1: Mark featured if ANY review has rating 5
      // return p.reviews.some((r) => r.rating === 5);

      // OPTION 2: Mark featured if AVERAGE rating == 5
      const avg =
        p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length;
      return Math.round(avg) === 5;
    });
  }, [properties]);

  return { data: featured, ...rest };
};