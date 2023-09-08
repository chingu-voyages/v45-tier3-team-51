"use client";

import { Footer } from "@/components/Footer";
import {
  createStyles,
  Avatar,
  Group,
  Container,
  Paper,
  Text,
} from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { Display } from "@/components/Display";
import { HeaderAction } from "@/components/Header";
import { Buttons } from "@/components/Buttons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoActionProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
}

// Create an array of dev information objects
const devs = [
  {
    avatar: "/avatar1.webp",
    title: "Full Stack Developer, DevOps, IT Ops",
    name: "David Gama",
    linkedin: "https://www.linkedin.com/in/gamadavid/",
    github: "https://github.com/gamadjg",
    portfolio: "https://github.com/gamadjg",
  },
  {
    avatar: "/avatar2.webp",
    title: "Programer & reader",
    name: "Sabih S.",
    linkedin: "https://www.linkedin.com/in/sabihsarowar/",
    github: "https://github.com/kleenkanteen",
    portfolio: "https://www.sabih.me/",
  },
  {
    avatar: "/avatar4.webp",
    title: "Software Engineer",
    name: "Kenny Tram",
    linkedin: "https://www.linkedin.com/in/kennytram/",
    github: "https://github.com/kennytram",
    portfolio: "https://kennytram.github.io/",
  },
  {
    avatar: "/avatar3.webp",
    title: "Full Stack Web dev & Software Engineer",
    name: "Lucile Tronczyk",
    linkedin: "https://www.linkedin.com/in/lucile-tronczyk/",
    github: "https://github.com/LucileTech",
    portfolio: "https://lucile-tech.com/",
  },
  {
    avatar: "/avatar5.webp",
    title: "Software Engineer",
    name: "Joyce Yu",
    linkedin: "https://www.linkedin.com/in/joyceyu-sf/",
    github: "https://github.com/joyceycodes",
    portfolio: "https://joyceyu.netlify.app/",
  },
];

export default function About() {
  const { classes } = useStyles();

  return (
    <>
      <main className="flex flex-col min-h-screen p-4">
        {/* Header */}
        <HeaderAction />

        <div className="flex-grow flex flex-col items-center justify-center">
          <Container size="lg" mt={4}>
            <Paper shadow="xs" className="p-20">
              <div className="mb-6 text-center" id="what-how-section">
                <Display text="IceBreaker - Break the Ice with Strangers!" />
              </div>

              <Text className="mt-20">
                Are you tired of those awkward silences when meeting new people?
                Do you wish there was a fun and engaging way to connect with
                strangers? Look no further, because <strong>IceBreaker</strong>{" "}
                is here to save the day!
              </Text>

              <Text mt={15} style={{ fontSize: "1.5em" }}>
                <strong>What is IceBreaker?</strong>
              </Text>

              <Text>
                IceBreaker is a unique and exciting game designed to help you
                break the ice with strangers and turn those awkward moments into
                memorable interactions. It&apos;s the ultimate ice-breaking tool
                for any social gathering or event.
              </Text>

              <Text mt={15} style={{ fontSize: "1.5em" }}>
                <strong>How Does It Work?</strong>
              </Text>

              <Text>
                Using IceBreaker is as easy as sharing a link with the people
                you want to play with. Whether you&apos;re at a party, a
                team-building event, a virtual meeting, or just hanging out with
                new friends, IceBreaker is the perfect way to kickstart
                conversations.
              </Text>

              <Text mt={10}>
                <ol>
                  <li>
                    <strong>Create a Room:</strong> Start by creating a virtual
                    room and generate a shareable link.
                  </li>
                  <li>
                    <strong>Invite Participants:</strong> Share the link with
                    the people you want to connect with. They can join the room
                    from their smartphones or computers.
                  </li>
                  <li>
                    <strong>Begin the Fun:</strong> Once everyone is in the
                    room, you can start the game! IceBreaker will suggest fun
                    and lighthearted actions or questions that everyone can
                    participate in.
                  </li>
                </ol>
              </Text>

              <Text mt={15} style={{ fontSize: "1.5em" }}>
                <strong>Why Choose IceBreaker?</strong>
              </Text>

              <Text>
                <ul>
                  <li>
                    <strong>No More Awkward Silences:</strong> IceBreaker turns
                    awkward moments into opportunities for laughter and bonding.
                    You&apos;ll never run out of things to talk about.
                  </li>
                  <li>
                    <strong>Inclusive and Diverse:</strong> IceBreaker is
                    designed for people of all backgrounds, ages, and interests.
                    It&apos;s a game that brings people together, regardless of
                    their differences.
                  </li>
                  <li>
                    <strong>Easy to Use:</strong> IceBreaker&apos;s
                    user-friendly interface makes it simple to start and play.
                    No complicated setups or downloads required.
                  </li>
                  <li>
                    <strong>Endless Fun:</strong> With a wide variety of
                    ice-breaking actions and questions, you can play IceBreaker
                    over and over again, and it will always feel fresh and
                    exciting.
                  </li>
                </ul>
              </Text>

              <Text mt={15} style={{ fontSize: "1.5em" }}>
                <strong>Join the IceBreaker Community!</strong>
              </Text>

              <Text>
                Whether you&apos;re at a social event, a virtual meetup, or just
                looking to connect with new people online, IceBreaker is the
                game that will keep the conversation flowing and the smiles
                coming. Say goodbye to awkward silences and hello to
                unforgettable moments.
              </Text>

              <div className="text-center mt-20 ">
                <Link href="/room" prefetch={false}>
                  <Buttons
                    text="Get Started with IceBreaker, create a room now!"
                    size="lg"
                  />
                </Link>
              </div>
            </Paper>
          </Container>

          <div className="mb-6 text-center mt-20" id="team-section">
            <Display text="The Team" />
          </div>

          {/* The Team is displayed */}
          <div>
            {devs.map((dev, index) => (
              <div key={dev.name} className="mb-6">
                <Group noWrap spacing={10} mt={3}>
                  <Avatar src={dev.avatar} size={94} radius="md" />

                  <div>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                      {dev.title}
                    </Text>

                    <Text fz="lg" fw={500} className={classes.name} mt={1}>
                      {dev.name}
                    </Text>

                    <Group noWrap spacing={10} mt={3}>
                      <a
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Group noWrap spacing={10}>
                          <IconBrandLinkedin size="1rem" stroke={1.5} />
                          <Text fz="xs" c="dimmed" ml={1}>
                            LinkedIn
                          </Text>
                        </Group>
                      </a>
                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Group noWrap spacing={10}>
                          <IconBrandGithub size="1rem" stroke={1.5} />
                          <Text fz="xs" c="dimmed" ml={1}>
                            GitHub
                          </Text>
                        </Group>
                      </a>
                      <a
                        href={dev.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text fz="xs" c="dimmed">
                          Portfolio
                        </Text>
                      </a>
                    </Group>
                  </div>
                </Group>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
