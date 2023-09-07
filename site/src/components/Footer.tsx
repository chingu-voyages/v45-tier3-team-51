"use client";

import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  rem,
  Text,
} from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const devs = [
  {
    firstname: "David",
    linkedin: "https://www.linkedin.com/in/gamadavid/",
    github: "https://github.com/gamadjg",
    portfolio: "https://github.com/gamadjg",
  },
  {
    firstname: "Joyce",
    linkedin: "https://www.linkedin.com/in/joyceyu-sf/",
    github: "https://github.com/joyceycodes",
    portfolio: "https://joyceyu.netlify.app/",
  },
  {
    firstname: "Kenny",
    linkedin: "https://www.linkedin.com/in/kennytram/",
    github: "https://github.com/kennytram",
    portfolio: "https://kennytram.github.io/",
  },
  {
    firstname: "Lucile",
    linkedin: "https://www.linkedin.com/in/lucile-tronczyk/",
    github: "https://github.com/LucileTech",
    portfolio: "https://lucile-tech.com/",
  },
  {
    firstname: "Sabih",
    linkedin: "https://www.linkedin.com/in/sabihsarowar/",
    github: "https://github.com/kleenkanteen",
    portfolio: "https://www.sabih.me/",
  },
];

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group
          spacing={0}
          className={classes.links}
          position="right"
          noWrap
        ></Group>
        <Container>
          <Text color="dimmed" size="sm">
            Made from scratch during a{" "}
            <a
              href="https://github.com/chingu-voyages/v45-tier3-team-51"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chingu Voyage
            </a>{" "}
            by:{" "}
          </Text>

          <Group spacing={0} position="right" noWrap>
            {devs.map((dev, index) => (
              <>
                <Text color="dimmed" size="sm">
                  {dev.firstname}{" "}
                </Text>
                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                  <ActionIcon size="lg">
                    <IconBrandGithub size="1.05rem" stroke={1.5} />
                  </ActionIcon>
                </a>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ActionIcon size="lg">
                    <IconBrandLinkedin size="1.05rem" stroke={1.5} />
                  </ActionIcon>
                </a>
              </>
            ))}
          </Group>
        </Container>
      </Container>
    </div>
  );
}
