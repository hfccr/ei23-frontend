import LiquidStaking from "@/constants/LiquidStaking.json";
import { useContractRead } from "wagmi";

export function usePreviewDeposit(amount) {
  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: LiquidStaking.address,
    abi: LiquidStaking.abi,
    functionName: "previewDeposit",
    args: [amount],
    watch: true,
  });
  return { isSuccess, data, isLoading, isError, error };
}
