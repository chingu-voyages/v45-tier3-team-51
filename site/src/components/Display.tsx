"use client";

import { Title } from "@mantine/core";

type props = {
  text: string;
};

export function Display({ text }: props) {
  return (
    <Title
      className="text-xl md:text-2xl lg:text-3xl"
      style={{ textDecoration: "none", color: "#339AF0" }}
    >
      {text}
    </Title>
  );
}
