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
  useIsClientWhitelisted,
} from "@/hooks/useClientRegistry";
import { EmulateClient } from "./EmulateClient";

export default function ClientRegistration() {
  const [hydrated, setHydrated] = useState(false);
  const { address } = useAccount();
  const {
    data: registered,
    isLoading,
    isError,
    error,
  } = useIsClientRegistered(address);
  const { data: whitelisted } = useIsClientWhitelisted(address);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <Box>
      {isLoading && <Skeleton />}
      {isError && <Typography>{error.message}</Typography>}
      {hydrated && !isLoading && !isError && (
        <>
          {registered && !whitelisted && (
            <Alert severity="info">
              You have successfully registered. The DAO is evaulating your
              application. You will be whitelisted to use the platform once the
              DAO approves.
            </Alert>
          )}
          {registered && whitelisted && (
            <Alert severity="success">
              You have successfully registered and whitelisted. You can now use
              the platform.
            </Alert>
          )}
          {!registered && (
            <>
              <EmulateClient />
            </>
          )}
        </>
      )}
    </Box>
  );
}
