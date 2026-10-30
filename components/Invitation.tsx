"use client";

import { useEffect, useState } from "react";
import Envelope from "./Envelope";
import Navbar from "./Navbar";

export default function Invitation({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.body.classList.add("locked");
    return () => document.body.classList.remove("locked");
  }, []);

  return (
    <>
      {showEnvelope && (
        <Envelope
          onReveal={() => {
            document.body.classList.remove("locked");
            setOpened(true);
          }}
          onDone={() => setShowEnvelope(false)}
        />
      )}
      <Navbar visible={opened} />
      <main className={opened ? "opened" : ""}>{children}</main>
    </>
  );
}
