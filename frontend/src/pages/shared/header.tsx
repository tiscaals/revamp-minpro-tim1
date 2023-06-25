import React from "react";
import Logo from "../../../public/logohitam.png"
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} >
      <Button
        variant="gradient"
        className="flex items-center gap-1 p-2 lg:ml-auto"
      >
          Sign Up
      </Button>
    </Menu>
  );
}

const navListItems = [
  {
    label: "Programs",
  },
  {
    label: "Online Course",
  },
  {
    label: "Job Hiring",
  },
  {
    label: "About",
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