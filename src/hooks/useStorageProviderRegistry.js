import { useContractRead } from "wagmi";
import StorageProviderRegistry from "@/constants/StorageProviderRegistry.json";

export function useIsStorageProviderRegistered(address) {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: StorageProviderRegistry.address,
    abi: StorageProviderRegistry.abi,
    functionName: "isStorageProviderAddressRegistered",
    args: [address],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}

export function useIsStorageProviderWhitelisted(address) {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: StorageProviderRegistry.address,
    abi: StorageProviderRegistry.abi,
    functionName: "isAddressWhitelisted",
    args: [address],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}

export function useAllStorageProviders(address) {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: StorageProviderRegistry.address,
    abi: StorageProviderRegistry.abi,
    functionName: "getAllStorageProviders",
    args: [],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}
