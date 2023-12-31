"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { Person, Save, Groups, PriceChange } from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Typography variant="h5">
          Client Investment Using DeFi Liquid Staking Data DAO Based On
          Retrieval Royalties
        </Typography>
      </div>
      <div className={styles.grid}>
        <Box
          className={styles.card}
          sx={{ background: "linear-gradient(135deg,#f08,#d0e)", margin: 2 }}
        >
          <Link href="/dapp/client/about">
            <Box sx={{ width: 100, height: 100 }}>
              <Person sx={{ fontSize: 80 }} />
            </Box>
            <h2>Filecoin Client</h2>
            <p>Get incentivized to store data important to humanity</p>
          </Link>
        </Box>
        <Box
          className={styles.card}
          sx={{ background: "linear-gradient(135deg,#d0e,#91f)", margin: 2 }}
        >
          <Link href="/dapp/provider/about">
            <Box sx={{ width: 100, height: 100 }}>
              <Save sx={{ fontSize: 80 }} />
            </Box>
            <h2>Filecoin Provider</h2>
            <p>Store High Quality High Retrieval Probability Data Sets</p>
          </Link>
        </Box>
        <Box
          className={styles.card}
          sx={{ background: "linear-gradient(135deg,#d0e,#91f)", margin: 2 }}
        >
          <Link href="/dapp/dao/client">
            <Box sx={{ width: 100, height: 100 }}>
              <Groups sx={{ fontSize: 80 }} />
            </Box>
            <h2>DAO</h2>
            <p>
              Manage Client Onboarding, Provider Onboarding & Subsidy Allocation
            </p>
          </Link>
        </Box>
        <Box
          className={styles.card}
          sx={{ background: "linear-gradient(135deg,#d0e,#91f)", margin: 2 }}
        >
          <Link href="/dapp/stake/stake">
            <Box sx={{ width: 100, height: 100 }}>
              <PriceChange sx={{ fontSize: 80 }} />
            </Box>
            <h2>Stake</h2>
            <p>Stake Filecoin To Earn Interest & Subsidize Client Storage</p>
          </Link>
        </Box>
      </div>
    </main>
  );
}
