import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import ClientRegistry from "@/constants/ClientRegistry.json";

export function EmulateClient() {
  const [clientId, setClientId] = React.useState();
  const [clientName, setClientName] = React.useState("");
  const debouncedClientId = useDebounce(clientId);
  const debouncedClientName = useDebounce(clientName);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ClientRegistry.address,
    abi: ClientRegistry.abi,
    functionName: "register",
    args: [parseInt(debouncedClientId), debouncedClientName],
    enabled: Boolean(debouncedClientId && debouncedClientName),
  });
  const { data, error, isError, write } = useContractWrite(config);
  console.log(error);
  console.log(isError);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("On submit called");
            write?.();
          }}
        >
          <TextField
            id="registerClientId"
            label="Client ID"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            sx={{ margin: 2 }}
          />
          <TextField
            id="registerClientName"
            label="Client Name"
            type="string"
            InputLabelProps={{
              shrink: true,
            }}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            sx={{ margin: 2 }}
          />
          <Box sx={{ textAlign: "center", margin: 1 }}>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              disabled={!write || isLoading}
            >
              {isLoading ? "Registring..." : "Register Client"}
            </Button>
          </Box>
          {isSuccess && (
            <div>
              Successfully Emulated Client Actor!
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
