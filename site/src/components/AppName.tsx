"use client";
import logo from "../../public/LOGO.png";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export function AppName() {
  const router = useRouter(); 

  const handleRedirectHome = () => {
    router.push('/');
  };

  return (
    <Image
      src={logo}
      onClick={handleRedirectHome}
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
