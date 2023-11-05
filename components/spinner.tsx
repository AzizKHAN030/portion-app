import React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { Loader } from 'lucide-react';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('text-muted-foregroun animate-spin', {
  variants: {
    size: {
      default: 'w-4 h-4',
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

const Spinner = ({ size }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size }))} />;
};

export default Spinner;
