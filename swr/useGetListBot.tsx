import { funcUtils } from "@/lib/funcUtils";
import { TOptionHook, TResponseData } from "@/model";
import { IBot } from "@/model/bot";
import useSWR from "swr";
import { getCookie } from "cookies-next/client";
import { SWR_KEYS } from "@/lib/swr-key";
import axiosInstance from "@/lib/axios";
export const useGetListBot = (option?: TOptionHook<any>) => {
  const { config, isFetch = true, params } = option ?? {};
  //
  const fetcher = async () => {
    const urlAPi = funcUtils.combineUrl("/api/v1/bots", params);
    try {
      const rest = await axiosInstance.get(urlAPi)

      const data: TResponseData<IBot[]> = rest.data;

      return data;
    } catch (error) {
      console.error("Fetcher error:", error);
      return null;
    }
  };

  const { data, error, isLoading, mutate } = useSWR(SWR_KEYS.BOTS, fetcher, {
    revalidateIfStale: true,
    // ...config,
  });

  return { data, error, isLoading, mutate };
};
