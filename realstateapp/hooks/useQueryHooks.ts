import { useQuery, QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import api from "@/utils/api";
import type { Property } from "@/types/Property";

/**
 * Type: Django REST Framework paginated response
 */
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Generic fetcher using axios
 */
async function fetcher<T>(url: string): Promise<T> {
  const res = await api.get<T>(url);
  return res.data;
}

/**
 * Hook: Fetch all properties list
 * Handles both plain list and paginated responses.
 */
export function useProperties() {
  const key = ["properties"] as const;

  return useQuery<Property[], Error>({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<Property> | Property[]>("/properties/");
      const data = res.data;

      // ✅ Normalize backend response
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray((data as PaginatedResponse<Property>).results)) {
        return (data as PaginatedResponse<Property>).results;
      } else {
        console.warn("Unexpected /properties/ response format:", data);
        return [];
      }
    },
    staleTime: 1000 * 30,          // fresh for 30s
    refetchInterval: 1000 * 60,    // revalidate every 60s
    refetchOnWindowFocus: true,    // instant refresh when tab regains focus
    refetchOnReconnect: true,
    retry: 1,
    initialData: [],               // ✅ prevents undefined early render
  });
}

/**
 * Hook: Single property detail by ID
 * Supports optional preview data for instant UI.
 */
export function usePropertyDetail(
  id?: string | number,
  options?: { initialData?: Partial<Property> | null }
) {
  const key = ["property", id] as const;

  return useQuery<Property, Error>({
    queryKey: key,
    queryFn: async () => {
      if (!id && id !== 0) throw new Error("Invalid property id");
      return fetcher<Property>(`/properties/${id}/`);
    },
    enabled: Boolean(id),
    initialData: options?.initialData as any,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Utility: Prefetch a property detail before navigation
 */
export async function prefetchPropertyDetail(
  queryClient: QueryClient,
  id: string | number,
  previewData?: Partial<Property>
) {
  const key = ["property", id] as const;

  // Preload cached data for instant UI
  if (previewData) {
    queryClient.setQueryData(key, previewData);
  }

  // Prefetch the full detail data in the background
  await queryClient.prefetchQuery({
    queryKey: key,
    queryFn: async () => {
      const data = await fetcher<Property>(`/properties/${id}/`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return queryClient.getQueryData<Property>(key);
}

/**
 * Hook: Featured properties
 * Example: filter those with 5-star reviews.
 */
export const useFeaturedProperties = () => {
  const { data: properties, ...rest } = useProperties();

  const featured = useMemo(() => {
    if (!Array.isArray(properties)) return [];

    return properties.filter((p) => {
      if (!p.reviews || p.reviews.length === 0) return false;
      const avg =
        p.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
        p.reviews.length;
      return Math.round(avg) === 5;
    });
  }, [properties]);

  return { data: featured, ...rest };
};
