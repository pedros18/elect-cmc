import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<Props> = ({ children, className }) => {
  const newClassName = twMerge(
    "max-w-screen-xl mx-auto py-10 px-4 lg:px-0 ", // Added bg-red-300 for visual verification
    className
  );
  return <div className={newClassName}>{children}</div>;
};

export default Container;
