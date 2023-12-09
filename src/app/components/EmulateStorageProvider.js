import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Box, Button, Container, TextField } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import StorageProviderRegistry from "@/constants/StorageProviderRegistry.json";
import { parseEther } from "viem";

export function EmulateStorageProvider() {
  const [storageProviderId, setStorageProviderId] = React.useState();
  const debouncedStorageProviderId = useDebounce(storageProviderId);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: StorageProviderRegistry.address,
    abi: StorageProviderRegistry.abi,
    functionName: "register",
    args: [debouncedStorageProviderId],
    enabled: Boolean(debouncedStorageProviderId),
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
            id="registerStorageProviderId"
            label="StorageProvider ID"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={storageProviderId}
            onChange={(e) => setStorageProviderId(e.target.value)}
            sx={{ margin: 2 }}
          />
          <Box sx={{ textAlign: "center", margin: 1 }}>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              disabled={!write || isLoading}
            >
              {isLoading ? "Registring..." : "Register StorageProvider"}
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
