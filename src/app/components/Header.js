"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Connect from "./Connect";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "transparent" }}>
        <Toolbar sx={{ marginTop: 3 }}>
          <Link href="/">
            <Box sx={{ marginLeft: 1, marginRight: 1 }}>
              <motion.div
                className="container"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{
                  scale: 0.8,
                  rotate: -90,
                  borderRadius: "100%",
                }}
                initial={{ scale: 0 }}
                animate={{ rotate: 180, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              />
            </Box>
          </Link>
          <Link href="/">
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "Audiowide" }}
            >
              RIFIL
            </Typography>
          </Link>
          <Box sx={{ marginLeft: "auto" }}>
            <Connect />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
