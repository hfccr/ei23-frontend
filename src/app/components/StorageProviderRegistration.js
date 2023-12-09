"use storageProvider";
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
  useAllStorageProviders,
  useIsStorageProviderRegistered,
} from "@/hooks/useStorageProviderRegistry";
import { EmulateStorageProvider } from "./EmulateStorageProvider";

export default function StorageProviderRegistration() {
  const [hydrated, setHydrated] = useState(false);
  const { address } = useAccount();
  const { data, isLoading, isError, error } =
    useIsStorageProviderRegistered(address);
  const { data: allStorageProviders } = useAllStorageProviders();
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
              application. You will be whitelisted to use the platform once the
              DAO approves.
            </Alert>
          )}
          {!data && (
            <>
              <EmulateStorageProvider />
            </>
          )}
        </>
      )}
    </Box>
  );
}
