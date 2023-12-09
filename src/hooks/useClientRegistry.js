import { useContractRead } from "wagmi";
import ClientRegistry from "@/constants/ClientRegistry.json";

export function useIsClientRegistered(address) {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: ClientRegistry.address,
    abi: ClientRegistry.abi,
    functionName: "isClientAddressRegistered",
    args: [address],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}

export function useIsClientWhitelisted(address) {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: ClientRegistry.address,
    abi: ClientRegistry.abi,
    functionName: "isAddressWhitelisted",
    args: [address],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}

export function useAllClients(address) {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: ClientRegistry.address,
    abi: ClientRegistry.abi,
    functionName: "getAllClients",
    args: [],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}
