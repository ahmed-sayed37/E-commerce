import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetApis(endpoint) {

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({

    queryKey: [endpoint],
    queryFn: () => {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/${endpoint}`);
    },
    enabled: true,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  }
}
