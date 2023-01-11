import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarItems = [
    { id: 1, name: 'home', icon: <FaIcons.FaHome size="28" /> },
    { id: 2, name: 'about', icon: <FaIcons.FaAws size="28" /> },
    { id: 3, name: 'projects', icon: <FaIcons.FaBitcoin size="28" /> },
    { id: 4, name: 'contact', icon: <FaIcons.FaAngellist size="28" /> },
  ];

  const handleOpenState = () => setIsOpen((prevState) => !prevState);
  return (
    <>
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } absolute z-10 h-screen w-full bg-black opacity-50  `}
        onClick={handleOpenState}
      ></div>
      <div className=" absolute left-7 z-30 mt-4 md:hidden">
        <FiIcons.FiBarChart2
          className="rotate-90  text-accent"
          size={30}
          onClick={handleOpenState}
        />
      </div>
      <div
        className={`${
          isOpen ? ' translate-x-0' : '-translate-x-full'
        }  fixed z-20 flex  h-screen  w-max flex-col gap-3 bg-gradient-to-r from-primary to-primary_s px-4 py-20 text-secondary shadow-lg duration-200   ease-in-out `}
      >
        {sidebarItems.map((item) => {
          return (
            <SideBarIcon
              key={item.id}
              name={item.name}
              icon={item.icon}
            ></SideBarIcon>
          );
        })}
      </div>
    </>
  );
};

type SidebarProps = {
  name: string;
  icon: React.ReactNode;
};

const SideBarIcon = ({ icon, name }: SidebarProps) => (
  <div className="sidebar-item-container">
    <div className="sidebar-icon ">
      {icon}
      {/* &lt;/&gt; */}
    </div>
    <p>{name}</p>
  </div>
);

export default Sidebar;
