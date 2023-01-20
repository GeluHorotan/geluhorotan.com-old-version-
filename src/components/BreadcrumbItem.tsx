import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

const BreadcrumbItem = ({ children, href, ...props }: Props) => {
  return (
    <li {...props}>
      <Link href={href} passHref>
        {children}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
