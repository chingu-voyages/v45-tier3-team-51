"use client";
import logo from "../../public/LOGO.png";
import Image from "next/image";

export function AppName() {
  return (
    <Image
      src={logo}
      alt="Logo"
      style={{
        maxWidth: "200px",
        padding: "30px",
        //   filter:
        //     "brightness(0) invert(80) sepia(80) saturate(100) hue-rotate(450deg)",
      }}
    />
  );
}
