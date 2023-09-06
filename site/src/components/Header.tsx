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

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        {/* <Group spacing={0} className={classes.links} position="left" noWrap> */}
        <ActionIcon size="xl">
          <AppName />
        </ActionIcon>
        {/* </Group> */}
        <Link
          href="/about"
          className="relative flex place-items-center before:absolute "
        >
          <Buttons text="About" size="xs" />
        </Link>
      </Container>
    </Header>
  );
}
