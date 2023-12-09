"use client";
import { useState, useEffect } from "react";
import {
  Skeleton,
  Typography,
  Box,
  Stack,
  Grid,
  Button,
  Alert,
} from "@mui/material";
import { useAccount, useBalance } from "wagmi";
import {
  useAllClients,
  useIsClientRegistered,
} from "@/hooks/useClientRegistry";
import { EmulateClient } from "./EmulateClient";

export default function ClientRegistration() {
  const [hydrated, setHydrated] = useState(false);
  const { address } = useAccount();
  const { data, isLoading, isError, error } = useIsClientRegistered(address);
  const { data: allClients } = useAllClients();
  console.log(allClients);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <Box>
      {isLoading && <Skeleton />}
      {isError && <Typography>{error.message}</Typography>}
      {hydrated && !isLoading && !isError && (
        <>
          {data && (
            <Alert severity="info">
              You have successfully registered. The DAO is evaulating your
              application.
            </Alert>
          )}
          {!data && (
            <>
              <EmulateClient />
            </>
          )}
        </>
      )}
    </Box>
  );
}
