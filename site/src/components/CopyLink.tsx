"use client";
import { CopyButton, Button } from "@mantine/core";
import { usePathname } from "next/navigation";

type props = {
  hostName: string;
};

export function CopyLink({ hostName }: props) {
  const path = usePathname();
  const shareLink = hostName + path;

  return (
    <div className="flex items-center justify-between border-2 border-black rounded-md py-2">
      <div className="pl-3">{shareLink}</div>
      <CopyButton value={shareLink}>
        {({ copied, copy }: any) => (
          <Button
            color={copied ? "teal" : "blue"}
            onClick={copy}
            variant="white"
            className="px-3 text-lg"
          >
            {copied ? "Copy" : "Copy"}
          </Button>
        )}
      </CopyButton>
    </div>
  );
}
