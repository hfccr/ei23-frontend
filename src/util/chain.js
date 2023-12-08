"use client";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { filecoinCalibration } from "viem/chains";
import { publicProvider } from "wagmi/providers/public";

export const fvmChain = filecoinCalibration;

const { chains, publicClient } = configureChains(
  [filecoinCalibration],
  [publicProvider()]
);

export { chains, publicClient };

const { connectors } = getDefaultWallets({
  appName: "Square",
  projectId: "bf21f319d82016192b7583904e1e2440",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
