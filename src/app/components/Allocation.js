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
  useGetClientAllocationByAddress,
  useIsClientRegistered,
  useIsClientWhitelisted,
} from "@/hooks/useClientRegistry";
import { EmulateClient } from "./EmulateClient";
import { useDoesClientHaveAllocationRequest } from "@/hooks/useSubsidyDao";
import { AllocationRequest } from "./AllocationRequest";

export default function Allocation() {
  const [hydrated, setHydrated] = useState(false);
  const { address } = useAccount();
  const {
    data: clientRegistered,
    isLoading: registrationLoading,
    isError: registrationError,
    error: registrationErrorMessage,
  } = useIsClientRegistered(address);
  const {
    data: clientWhitelisted,
    isLoading: whitelistedLoading,
    isError: whitelistedError,
    error: whitelistedErrorMessage,
  } = useIsClientWhitelisted(address);
  const {
    data: clientAllocation,
    isLoading: allocationLoading,
    isError: allocationError,
    error: allocationErrorMessage,
  } = useGetClientAllocationByAddress(address);
  const {
    data: allocationRequest,
    isLoading: allocationRequestLoading,
    isError: allocationRequestError,
    error: allocationRequestErrorMessage,
  } = useDoesClientHaveAllocationRequest(address);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const isLoading =
    registrationLoading ||
    allocationLoading ||
    allocationRequestLoading ||
    whitelistedLoading;
  const isError =
    registrationError ||
    allocationError ||
    allocationRequestError ||
    whitelistedError;
  return (
    <Box>
      {isLoading && <Skeleton />}
      {isError && <Alert severity="error">An error occured</Alert>}
      {hydrated && !isLoading && !isError && (
        <>
          {clientRegistered && !clientWhitelisted && (
            <Alert severity="info">
              You have successfully registered. The DAO is evaulating your
              application. You will be whitelisted to use the platform once the
              DAO approves.
            </Alert>
          )}
          {clientRegistered && clientWhitelisted && !allocationRequest && (
            <AllocationRequest />
          )}
          {clientRegistered && clientWhitelisted && allocationRequest && (
            <Alert severity="info">
              Your allocation request is being processed by the DAO
            </Alert>
          )}
          {!clientRegistered && (
            <Alert severity="warning">
              Register first to be eligible for allocations
            </Alert>
          )}
        </>
      )}
    </Box>
  );
}
