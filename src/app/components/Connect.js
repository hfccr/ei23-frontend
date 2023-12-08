"use client";
import { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { newDelegatedEthAddress } from "@glif/filecoin-address";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Connect({}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const { address, isConnected } = useAccount();
  let message = "Connect MetaMask";
  let showConnect = true;
  let t4Message = "Connect MetaMask";
  let f4Address;
  if (isConnected && hydrated) {
    showConnect = false;
    message = address.slice(0, 6) + "..." + address.slice(-4);
    f4Address = newDelegatedEthAddress(address).toString();
    t4Message = f4Address.slice(0, 6) + "..." + f4Address.slice(-4);
  }
  const copyf4AddressToClipboard = () => {
    navigator.clipboard.writeText(f4Address);
    toast.success("Copied to clipboard", {
      style: {
        border: "2px solid #000",
      },
    });
  };
  return (
    <Stack direction="column">
      <ConnectButton chainStatus="icon" />
      {!showConnect && (
        <Button onClick={copyf4AddressToClipboard}>{t4Message}</Button>
      )}
    </Stack>
  );
}
