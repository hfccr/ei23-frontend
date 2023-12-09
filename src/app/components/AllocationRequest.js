import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { Box, Button, Container, TextField } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import SubsidyDao from "@/constants/SubsidyDao.json";

export function AllocationRequest() {
  const [allocation, setAllocation] = React.useState();
  const debouncedAllocation = useDebounce(allocation);
  const { address } = useAccount();
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: SubsidyDao.address,
    abi: SubsidyDao.abi,
    functionName: "createClientAllocationRequestByAddress",
    args: [address, debouncedAllocation],
    enabled: Boolean(debouncedAllocation),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            write?.();
          }}
        >
          <TextField
            id="allocation"
            label="Subsidy Allocation"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={allocation}
            onChange={(e) => setAllocation(e.target.value)}
            sx={{ margin: 2 }}
          />
          <Box sx={{ textAlign: "center", margin: 1 }}>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              disabled={!write || isLoading}
            >
              {isLoading ? "Setting Allocation..." : "Allocation Setup"}
            </Button>
          </Box>
          {isSuccess && (
            <div>
              Successfully Emulated StorageProvider Actor!
              <Box sx={{ textAlign: "center" }}>
                <Button
                  href={`https://fvm.starboard.ventures/calibration/explorer/tx/${data?.hash}`}
                >
                  View On Starboard
                </Button>
              </Box>
            </div>
          )}
          {(isPrepareError || isError) && (
            <div>
              <div>Prepare Error</div>
              <div>{prepareError?.message}</div>
              <div>Normal Error</div>
              <div>{error?.message}</div>
            </div>
          )}
        </form>
      </Box>
    </Container>
  );
}
