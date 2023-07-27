import React, { useEffect, useState } from 'react';
import Logo from '../../../public/logohitam.png';
import Image from 'next/image';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@material-tailwind/react';
import { ChevronDownIcon, Bars2Icon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function ProfileMenu() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const [adatoken, setAdatoken] = useState()

  const token:any = Cookies.get('access_token');

  useEffect(()=>{
    setAdatoken(token);
  }, [token])

  console.log("ada tokenn",adatoken)

  const logoutAuth = async () => {
    try {
      const result = await Swal.fire({
        title: 'logout confirm',
        text: 'are you sure want to exit?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      });

      if (result.isConfirmed) {
        Cookies.remove('access_token');
        router.push('/');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to logout. Please try again.', 'error');
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
      {!adatoken ? (
        <>
          <Button
            onClick={() => router.push('/signin')}
            variant="text"
            className="flex items-center gap-1 p-2 lg:ml-auto"
          >
            Sign In
          </Button>

          <Button
            onClick={() => router.push('/external/signup')}
            variant="gradient"
            className="flex items-center gap-1 p-2 lg:ml-auto"
          >
            Sign Up
          </Button>
        </>
      ) : (
        <Button
          onClick={logoutAuth}
          variant="gradient"
          className="flex items-center gap-1 p-2 lg:ml-auto"
        >
          Log out
        </Button>
      )}
    </Menu>
  );
}

const navListItems = [
  {
    label: 'Programs',
  },
  {
    label: 'Online Course',
  },
  {
    label: 'Job Hiring',
  },
  {
    label: 'About',
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {/* <NavListMenu /> */}
      {navListItems.map(({ label }, key) => (
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
              <ChevronDownIcon className="h-[18px]" />
            </MenuItem>
          </Typography>
        </div>
      ))}
    </ul>
  );
}

export default function Header() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen(cur => !cur);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className="bg-white border-b-2">
      <Navbar className="shadow-none mx-auto rounded-none p-2 lg:px-6">
        <div className="relative mx-auto flex items-center text-blue-gray-900">
          <Image src={Logo} alt="Logo" className="h-8 w-auto" />
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            // variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <div className="absolute right-0">
            <div className="flex gap-3">
              <ProfileMenu />
            </div>
          </div>
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList />
        </Collapse>
      </Navbar>
    </div>
  );
}