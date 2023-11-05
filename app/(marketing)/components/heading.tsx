'use client';

import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, Documents, & Plans. Unified. Welcome to &nbsp;
        <span className="underline">Portion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Portion is the connected workspace where <br />
        teams create, collaborate, and get work done.
      </h3>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {isAuthenticated && (
        <Button asChild>
          <Link href="/documents">
            Enter Portion <ArrowRight className=" h-4 w-4 ml-2 " />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button size="sm">
            Get Portion free <ArrowRight className=" h-4 w-4 ml-2 " />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
