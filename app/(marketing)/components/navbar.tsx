'use client';

import React from 'react';

import { SignInButton, UserButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';

import { ModeToggle } from '@/components/mode-toggle';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import useScrollTop from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';

import Logo from './logo';

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        'z-50 bg-background  dark:bg-[#1F1F1F]  fixed top-0 flex items-center w-full p-6 transition-all duration-200',
        scrolled && 'border-b shadow-md dark:bg-[#2F2F2F]'
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Portion free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm">
              <Link href="/documents">Enter Portion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
