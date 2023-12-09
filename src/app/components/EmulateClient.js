import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDebounce } from "@/hooks/useDebounce";
import ClientRegistry from "@/constants/ClientRegistry.json";

export function EmulateClient() {
  const [clientId, setClientId] = React.useState();
  const [clientName, setClientName] = React.useState("");
  const [clientWebsite, setClientWebsite] = React.useState("");
  const [clientRegion, setClientRegion] = React.useState("");
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
          <TextField
            id="registerDataOwnerName"
            label="Organization Website"
            type="string"
            InputLabelProps={{
              shrink: true,
            }}
            value={clientWebsite}
            onChange={(e) => setClientWebsite(e.target.value)}
            sx={{ margin: 2 }}
          />
          <TextField
            id="registerRegion"
            label="Region"
            type="string"
            InputLabelProps={{
              shrink: true,
            }}
            value={clientRegion}
            onChange={(e) => setClientRegion(e.target.value)}
            sx={{ margin: 2 }}
          />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Expected Data Access Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label="Standard"
              />
              <FormControlLabel
                value="Nearline"
                control={<Radio />}
                label="Nearline"
              />
              <FormControlLabel
                value="coldline"
                control={<Radio />}
                label="Coldline"
              />
              <FormControlLabel
                value="archive"
                disabled
                control={<Radio />}
                label="Archive"
              />
            </RadioGroup>
          </FormControl>
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
