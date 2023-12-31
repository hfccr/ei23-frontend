import { useContractRead } from "wagmi";
import SubsidyDao from "@/constants/SubsidyDao.json";

export function useDoesClientHaveAllocationRequest(address) {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: SubsidyDao.address,
    abi: SubsidyDao.abi,
    functionName: "doesClientHaveAllocationRequest",
    args: [address],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}

export function useGetClientWhitelistRequests() {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: SubsidyDao.address,
    abi: SubsidyDao.abi,
    functionName: "getClientWhitelistRequests",
    args: [],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}

export function useGetStorageProviderWhitelistRequests() {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: SubsidyDao.address,
    abi: SubsidyDao.abi,
    functionName: "getStorageProviderWhitelistRequests",
    args: [],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}

export function useGetClientAllocationRequests() {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: SubsidyDao.address,
    abi: SubsidyDao.abi,
    functionName: "getClientAllocationRequests",
    args: [],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}
