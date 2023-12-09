"use client";
import React from "react";
import { Tab, Box, Divider, Stack, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const path = usePathname();
  let selected = "about";
  if (path.indexOf("deals") >= 0) {
    selected = "deals";
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
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
          padding: 3,
          borderRadius: 1,
        }}
      >
        Client
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
            label="Register"
            value="about"
            href="/dapp/client/about"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
          <Tab
            label="Allocation"
            value="allocation"
            href="/dapp/client/allocation"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
          <Tab
            label="Retrieve Deals"
            value="deals"
            href="/dapp/client/deals"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
        </Tabs>
        <>{children}</>
      </Stack>
    </>
  );
}
