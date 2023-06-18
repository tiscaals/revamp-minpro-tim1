import React from "react";
import Logo from "../../../public/logohitam.png"
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
 
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      {/* <MenuHandler> */}
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full p-2 lg:ml-auto"
        >
            Login
        </Button>
      {/* </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList> */}
    </Menu>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Programs",
    // icon: UserCircleIcon,
  },
  {
    label: "Online Course",
    // icon: CubeTransparentIcon,
  },
  {
    label: "Job Hiring",
    // icon: CodeBracketSquareIcon,
  },
  {
    label: "About",
    // icon: CodeBracketSquareIcon,
  },
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {/* <NavListMenu /> */}
      {navListItems.map(({ label}, key) => (
        <div>
            <Typography
            key={label}
            as="a"
            href="#"
            variant="small"
            color="blue-gray"
            className="font-normal"
            >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
                {label}
                <ChevronDownIcon className="h-[18px]"/>
            </MenuItem>
            </Typography>
        </div>
      ))}
    </ul>
  );
}
 
export default function Header() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
 
  return (
    <div className="bg-white border-b-2">
        <Navbar className="shadow-none mx-auto rounded-none p-2 lg:px-6">
        <div className="relative mx-auto flex items-center text-blue-gray-900">
            <Image
                src={Logo}
                alt="Logo"
                className="h-8 w-auto"
            />
            <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList />
            </div>
            <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
            >
            <Bars2Icon className="h-6 w-6" />
            </IconButton>
            <ProfileMenu />
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
            <NavList />
        </Collapse>
        </Navbar>
    </div>
  );
}