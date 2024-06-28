import { useQuery } from "@tanstack/react-query";
import api from "/src/api";
import apiKeys from "/src/api/keys.json";

export default function (paymentId) {
  // Getting payment data from the backend
  const {
    data: payment,
    isPending,
    error,
  } = useQuery({
    queryKey: [apiKeys.GET_PAYMENT, paymentId],
    queryFn: () => api[apiKeys.GET_PAYMENT](paymentId),
    enabled: !!paymentId,
  });

  return {
    payment: payment?.data,
    isPending,
    error,
  };
}
