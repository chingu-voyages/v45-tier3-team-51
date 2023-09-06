"use client";

import { Footer } from "@/components/Footer";
import { AppName } from "@/components/AppName";
import { createStyles, Avatar, Text, Group } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { Display } from "@/components/Display";

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

// Create an array of user information objects
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
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <AppName />
        </div>

        <div className="flex-grow flex flex-col items-center justify-center">
          {/* Display */}
          <div className="mb-6 text-center">
            <Display text="IceBreaker" />
            <Display text="Break the Ice with Strangers!" />
            <Text>
              Are you tired of those awkward silences when meeting new people?
              Do you wish there was a fun and engaging way to connect with
              strangers? Look no further, because IceBreaker is here to save the
              day! What is IceBreaker? IceBreaker is a unique and exciting game
              designed to help you break the ice with strangers and turn those
              awkward moments into memorable interactions. It s the ultimate
              ice-breaking tool for any social gathering or event. How Does It
              Work? Using IceBreaker is as easy as sharing a link with the
              people you want to play with. Whether you re at a party, a
              team-building event, a virtual meeting, or just hanging out with
              new friends, IceBreaker is the perfect way to kickstart
              conversations. Create a Room: Start by creating a virtual room and
              generate a shareable link. Invite Participants: Share the link
              with the people you want to connect with. They can join the room
              from their smartphones or computers. Begin the Fun: Once everyone
              is in the room, you can start the game! IceBreaker will suggest
              fun and lighthearted actions or questions that everyone can
              participate in. Why Choose IceBreaker? No More Awkward Silences:
              IceBreaker turns awkward moments into opportunities for laughter
              and bonding. You ll never run out of things to talk about.
              Inclusive and Diverse: IceBreaker is designed for people of all
              backgrounds, ages, and interests. It s a game that brings people
              together, regardless of their differences. Easy to Use: IceBreaker
              s user-friendly interface makes it simple to start and play. No
              complicated setups or downloads required. Endless Fun: With a wide
              variety of ice-breaking actions and questions, you can play
              IceBreaker over and over again, and it will always feel fresh and
              exciting. Join the IceBreaker Community! Whether you re at a
              social event, a virtual meetup, or just looking to connect with
              new people online, IceBreaker is the game that will keep the
              conversation flowing and the smiles coming. Say goodbye to awkward
              silences and hello to unforgettable moments. Ready to break the
              ice and create lasting connections? Give IceBreaker a try today
              and see how it transforms your social interactions! Get Started
              with IceBreaker and let the fun begin!
            </Text>
          </div>

          {/* Display */}
          <div className="mb-6 text-center">
            <Display text="The Team" />
          </div>

          {/* The Team is displayed */}
          <div>
            {devs.map((dev, index) => (
              <div key={dev.name}>
                <Group noWrap>
                  <Avatar src={dev.avatar} size={94} radius="md" />
                  <div>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                      {dev.title}
                    </Text>

                    <Text fz="lg" fw={500} className={classes.name}>
                      {dev.name}
                    </Text>
                    <Group noWrap spacing={10} mt={5}>
                      <a
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Group noWrap spacing={10} mt={3}>
                          <IconBrandLinkedin size="1rem" stroke={1.5} />
                        </Group>
                      </a>
                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Group noWrap spacing={10} mt={5}>
                          <IconBrandGithub size="1rem" stroke={1.5} />
                        </Group>
                      </a>
                      <a
                        href={dev.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text fz="xs" c="dimmed">
                          {dev.portfolio}
                        </Text>
                      </a>
                    </Group>
                    {/* <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Group noWrap spacing={10} mt={3}>
                        <IconBrandLinkedin size="1rem" stroke={1.5} />
                      </Group>
                    </a>

                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Group noWrap spacing={10} mt={5}>
                        <IconBrandGithub size="1rem" stroke={1.5} />
                      </Group>
                    </a> */}
                  </div>{" "}
                </Group>{" "}
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
