// custom hook (v5-compatible)
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";


export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-urls", token],
    enabled: !!token,                  //don't run until token exists
    queryFn: async () => {
      const res = await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res?.data?.data ?? res?.data ?? [];
    },
    // sort only if we an array is present
    select: (arrOrObj) => {
      const arr = Array.isArray(arrOrObj) ? arrOrObj : [];
      return arr.slice().sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    },
    onError,
    staleTime: 5000,
  });
};






export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["url-totalclick", token],
    queryFn: async () => {
      const res = await api.get(
        "/api/urls/totalClicks?startDate=2025-01-01&endDate=2025-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // return the payload (so `select` sees the object directly)
    },
    enabled: !!token,
    select: (data) =>
      Object.keys(data).map((key) => ({
        clickDate: key,
        count: data[key],
      })),
    onError,
    staleTime: 5000,
  });
};
