"use client";

import { AppName } from "@/components/AppName";
import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  rem,
  ActionIcon,
} from "@mantine/core";
import React, { useState } from "react";
import { Buttons } from "@/components/Buttons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#E7F5FF",
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

// const mainStyles = {
//   backgroundColor: "#E7F5FF",
// };

export function HeaderAction() {
  const { classes } = useStyles();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log("toto", pathname, "tata", searchParams);
  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <ActionIcon size="xl">
          <AppName />
        </ActionIcon>

        {pathname === "/about" ? (
          <>
            {/* <Link href="#what-how-section">
              <Buttons text="The What & How" size="xs" />
            </Link> */}
            <Link href="#team-section">
              <Buttons text="The Team" size="xs" />
            </Link>
          </>
        ) : (
          <Link
            href="/about"
            className="relative flex place-items-center before:absolute "
          >
            <Buttons text="About" size="xs" />
          </Link>
        )}
      </Container>
    </Header>
  );
}
