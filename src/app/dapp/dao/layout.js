"use client";
import React from "react";
import { Tab, Box, Divider, Stack, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DaoLayout({ children }) {
  const path = usePathname();
  let selected = "client";
  if (path.indexOf("storageProvider") >= 0) {
    selected = "storageProvider";
  } else if (path.indexOf("allocation") >= 0) {
    selected = "allocation";
  }
  return (
    <>
      <Box
        component="div"
        sx={{
          marginBottom: 2,
          fontFamily: "Krona One",
          fontSize: "x-large",
          cursor: "pointer",
          background:
            "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
          padding: 2,
          paddingLeft: 5,
          borderRadius: 1,
        }}
      >
        LP DAO
      </Box>
      <Stack direction="row" sx={{ padding: 2, marginTop: 4 }} spacing={4}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          orientation="vertical"
          variant="standard"
          aria-label="client menu vertical"
          value={selected}
          sx={{
            borderRight: 1,
            borderColor: "divider",
            flexShrink: 0,
            width: "220px",
            alignContent: "flex-start",
          }}
        >
          <Tab
            color="secondary"
            label="Client"
            value="client"
            href="/dapp/dao/client"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
          <Tab
            label="Provider"
            value="storageProvider"
            href="/dapp/dao/storageProvider"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
          <Tab
            label="Allocation"
            value="allocation"
            href="/dapp/dao/allocation"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
        </Tabs>
        <>{children}</>
      </Stack>
    </>
  );
}
