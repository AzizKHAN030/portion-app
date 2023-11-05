import React from 'react';

import { Poppins } from 'next/font/google';
import Image from 'next/image';

import { cn } from '@/lib/utils';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.png"
        width={40}
        height={40}
        alt="Logo "
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.png"
        width={40}
        height={40}
        alt="Logo "
        className="light:hidden"
      />
      <p className={cn('font-semibold', font.className)}>Portion</p>
    </div>
  );
};

export default Logo;
