import React from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useGetStorageProviderWhitelistRequests } from "@/hooks/useSubsidyDao";
import List from "@mui/material/List";
import { ProviderWhitelistRow } from "./ProviderWhitelistRow";

export function ProviderWhitelist() {
  const { data, isError, isLoading, error, isSuccess } =
    useGetStorageProviderWhitelistRequests();
  console.log(data);
  return (
    <>
      <div></div>
      <Stack alignItems="center" flexGrow={1} spacing={2}>
        <Box sx={{ display: "block" }}>
          <Typography variant="h6">Approve Storage Providers</Typography>
        </Box>
        {isLoading && <Skeleton />}
        {isError && <Alert severity="error">Failed to fetch </Alert>}
        {isSuccess && (
          <List sx={{ width: "100%", width: 360, bgcolor: "background.paper" }}>
            {data &&
              data.map((request, index) => {
                return (
                  <ProviderWhitelistRow
                    request={request}
                    index={index}
                    key={index}
                  />
                );
              })}
          </List>
        )}
      </Stack>
    </>
  );
}
