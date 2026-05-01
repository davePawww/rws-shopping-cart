import type { QueryClient } from '@tanstack/react-query';
import type { JSX } from 'react';

export type RouterContext = {
  queryClient: QueryClient;
};

export type HeaderProps = {
  title: string;
  projectLink: string;
};

export type ThemeStore = {
  theme: 'light' | 'dark';
  toggle: () => void;
};

export type AvatarIconProps = {
  link: string;
  icon: JSX.Element;
};
