"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizable-navbar";
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Dynamically import Phantom wallet connect button (to avoid SSR issues)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", link: "#features" },
    { name: "How it Works", link: "#how-it-works" },
  ];

  return (
    <Navbar>
      {/* Desktop Navbar */}
      <NavBody>
        {/* Left: Nexis Text */}
        <Link href="/" className="text-lg font-bold text-white  px-2">
          Nexis
        </Link>

        {/* Middle: Nav Links */}
        <NavItems items={navLinks} />

        {/* Right: Sign In and Connect Wallet */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal" signUpForceRedirectUrl={"/Index"}>
              <NavbarButton variant="secondary">Sign In</NavbarButton>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8", // optional: smaller avatar
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          <Link
            href="/"
            className="text-lg font-bold text-black dark:text-white"
          >
            Nexis
          </Link>
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-black dark:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}

          <SignedOut>
            <SignInButton mode="modal">
              <NavbarButton
                className="mt-4 w-full text-white"
                variant="secondary"
              >
                Sign In
              </NavbarButton>
            </SignInButton>
          </SignedOut>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
