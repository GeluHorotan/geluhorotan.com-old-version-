'use client';

import { useRouter } from 'next/dist/client/router';
import type { FC } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

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

import Button from './Button';

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
}

const Dropdown: FC<Props> = ({ children, data, secondLabel }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
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
