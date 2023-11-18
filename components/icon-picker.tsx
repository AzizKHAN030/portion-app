'use client';

import React from 'react';

import { PopoverContent } from '@radix-ui/react-popover';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useTheme } from 'next-themes';

import { Popover, PopoverTrigger } from '@/components/ui/popover';

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

const IconPicker = ({ onChange, children, asChild }: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };
  const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap;
  const theme = themeMap[currentTheme];
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none z-[99999]">
        <EmojiPicker
          height={450}
          theme={theme}
          onEmojiClick={data => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
