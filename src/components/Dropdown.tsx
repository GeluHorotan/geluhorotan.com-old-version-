'use client';

import { useRouter } from 'next/dist/client/router';
import type { FC } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/primitives/DropdownMenu';

interface Props {
  children: React.ReactNode;
  data: {
    header: string;
    items: {
      name: string;
      to?: string;
      id: number;
      isNew?: boolean;
      action?: Function;
    }[];
  };
  secondLabel: string;
  reverseColor?: boolean;
}

const Dropdown: FC<Props> = ({ children, data, secondLabel, reverseColor }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${reverseColor && 'text-secondary dark:text-primary'} `}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {data?.header}
          <br />
          {secondLabel}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.items.map((item, i) => {
          return (
            <div key={item.id}>
              {item.isNew && <DropdownMenuSeparator></DropdownMenuSeparator>}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    if (item.to) {
                      router.push(item.to);
                    } else if (item.action) {
                      item.action();
                    }
                  }}
                >
                  <span>{item.name}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
