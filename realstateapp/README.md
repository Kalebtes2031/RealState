Ah! This is a great question about **React Query’s caching and automatic updates**. Let’s break it down carefully with respect to your setup.

---

### 1. **Your current React Query setup**

In `_layout.tsx`, your `QueryClient` defaults are:

```ts
defaultOptions: {
  queries: {
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  },
},
```

And in your hooks, you also have `staleTime` per query (like 2 or 5 minutes).

---

### 2. **What this means for fresh data**

#### **`staleTime`**

* `staleTime` is the period during which cached data is considered **fresh**.
* If the cached data is **fresh**, React Query **will not refetch** from the server automatically.
* Once the cached data becomes **stale** (i.e., `staleTime` has passed), React Query will refetch automatically **on certain triggers**:

#### **Triggers for refetch**

1. **Window/screen focus** (`refetchOnWindowFocus: true`)

   * When you navigate away from the app and come back, any **stale queries** will refetch automatically.
2. **Manual invalidation**

   * You can call `queryClient.invalidateQueries(["properties"])` to force a refetch.
3. **Mounting**

   * If a query is mounted **after `staleTime` has expired**, it triggers a fetch.
4. **Interval polling**

   * If you set `refetchInterval`, React Query will poll automatically.

---

### 3. **Your specific hooks**

* `useProperties()` has `staleTime: 2 min`
  → Cached data is fresh for **2 minutes**, after that it becomes stale.
* `usePropertyDetail()` has `staleTime: 5 min`
  → Cached detail data is fresh for **5 minutes**.

**Implications:**

* If a new property is added in the backend, your app **will not automatically see it immediately** if the cached data is still fresh.
* After the stale time passes (2 min for `properties`), the next time the query is accessed (or the user focuses the app), React Query **will fetch the latest data**.

---

### 4. **With Persisted Cache (`PersistQueryClientProvider`)**

* You’re persisting cache to AsyncStorage, so even after closing the app, the last cached data is restored.
* On restore, the `onSuccess` callback calls:

```ts
queryClient.invalidateQueries();
```

* This **forces a refetch of all queries** immediately after restoring cache, so your app will get fresh data at startup.

---

### 5. **When the user sees new backend data**

With your current setup:

| Scenario                                    | When new data appears in UI                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| App running, user has property list mounted | After **2 min**, then on focus or mount, it refetches                                            |
| User navigates to detail page               | If detail query is fresh (5 min), cached preview is used; after 5 min it refetches automatically |
| App closed and reopened                     | On restore, `invalidateQueries()` triggers refetch immediately                                   |

---

### ✅ 6. **How to see new data faster**

If you want **near real-time updates**, you can:

1. **Decrease `staleTime`**:

```ts
staleTime: 1000 * 30 // 30 seconds
```

2. **Enable polling**:

```ts
useQuery({
  queryKey: ["properties"],
  queryFn: fetchProperties,
  refetchInterval: 1000 * 30, // refetch every 30s
});
```

3. **Manually invalidate after mutations**
   If you have a "Create Property" API, call:

```ts
queryClient.invalidateQueries(["properties"]);
```

---

### **Summary**

* React Query **does not constantly poll** the server by default.

* Cached data is considered **fresh for `staleTime`** and won’t refetch until stale.

* With your setup:

  * Property list: 2 min fresh → refetch on focus or after stale
  * Property detail: 5 min fresh → refetch on focus or after stale
  * Persisted cache triggers immediate refetch on app restore

* To see new backend data faster, either **reduce staleTime**, **use polling**, or **manually invalidate queries**.

---

If you want, I can draw a **timeline diagram showing exactly when `properties` and `property detail` get updated** for your current setup — it makes it super clear.

Do you want me to do that?
