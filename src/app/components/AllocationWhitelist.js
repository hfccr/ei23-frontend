import React from "react";

import { Alert, Box, Skeleton, Stack, Typography } from "@mui/material";
import { useGetClientAllocationRequests } from "@/hooks/useSubsidyDao";
import List from "@mui/material/List";
import { AllocationWhitelistRow } from "./AllocationWhitelistRow";

export function AllocationWhitelist() {
  const { data, isError, isLoading, error, isSuccess } =
    useGetClientAllocationRequests();

  return (
    <>
      <div></div>
      <Stack alignItems="center" flexGrow={1} spacing={2}>
        <Box sx={{ display: "block" }}>
          <Typography variant="h6">
            Approve Client Allocation Requests
          </Typography>
        </Box>
        {isLoading && <Skeleton />}
        {isError && <Alert severity="error">Failed to fetch</Alert>}
        {isSuccess && (
          <List sx={{ width: "100%", width: 360, bgcolor: "background.paper" }}>
            {data.map((request, index) => {
              return (
                <AllocationWhitelistRow
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
