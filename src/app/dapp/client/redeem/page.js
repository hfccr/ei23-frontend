"use client";
import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Box, Button, Container, TextField } from "@mui/material";

export default function Redeem() {
  const [dealId, setDealId] = React.useState();

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextField
            id="DealID"
            label="Deal ID"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={dealId}
            onChange={(e) => setDealId(e.target.value)}
            sx={{ margin: 2 }}
          />
          <Box sx={{ textAlign: "center", margin: 1 }}>
            <Button type="submit" color="secondary" variant="outlined">
              Redeem Subsidy
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
