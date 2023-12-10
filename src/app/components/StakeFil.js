"use client";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { usePreviewDeposit } from "@/hooks/useLiquidStaking";
import LiquidStaking from "@/constants/LiquidStaking.json";
import { parseEther } from "viem";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function StakeFil() {
  const [amount, setAmount] = useState(0);
  const debounceAmount = useDebounce(amount);
  const {
    data: shares,
    isError: previewError,
    isLoading: previewLoading,
    error: previewErrorMessage,
    isSuccess: previewIsSuccess,
  } = usePreviewDeposit(debounceAmount);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: LiquidStaking.address,
    abi: LiquidStaking.abi,
    functionName: "stake",
    value: debounceAmount ? debounceAmount : undefined,
  });
  const { data, error, isError, write } = useContractWrite(config);
  console.log("Data, error, iserror");
  console.log(data);
  console.log(prepareError);
  console.log(isPrepareError);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  return (
    <Container>
      <Stack spacing={3} justifyContent="center">
        <Typography>Stake FIL and receive RIFIL</Typography>
        <TextField
          id="stakeAmount"
          label="FIL"
          type="number"
          InputLabelProps={{ shrink: true }}
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value < 0 ? 0 : e.target.value)}
          sx={{ margin: 2 }}
        />
        <Typography>
          You will receive {shares ? shares.toString() : 0} RIFIL
        </Typography>
        {isSuccess && <Alert severity="success">Staked successfully</Alert>}
        {isLoading && <Typography>Staking...</Typography>}
        <Button
          variant="outlined"
          sx={{ width: 100, marginLeft: "auto", marginRight: "auto" }}
          onClick={() => {
            write?.();
          }}
        >
          Stake
        </Button>
      </Stack>
    </Container>
  );
}
