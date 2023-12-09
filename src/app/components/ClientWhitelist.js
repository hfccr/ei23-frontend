import React from "react";

import { Alert, Box, Skeleton, Stack, Typography } from "@mui/material";
import { useGetClientWhitelistRequests } from "@/hooks/useSubsidyDao";
import List from "@mui/material/List";
import { ClientWhitelistRow } from "./ClientWhitelistRow";

export function ClientWhitelist() {
  const { data, isError, isLoading, error, isSuccess } =
    useGetClientWhitelistRequests();

  return (
    <>
      <div></div>
      <Stack alignItems="center" flexGrow={1} spacing={2}>
        <Box sx={{ display: "block" }}>
          <Typography variant="h6">Approve Clients</Typography>
        </Box>
        {isLoading && <Skeleton />}
        {isError && <Alert severity="error">Failed to fetch </Alert>}
        {isSuccess && (
          <List sx={{ width: "100%", width: 360, bgcolor: "background.paper" }}>
            {data.map((request, index) => {
              return (
                <ClientWhitelistRow
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
