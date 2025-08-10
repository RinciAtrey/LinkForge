// custom hook (v5-compatible)
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

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
