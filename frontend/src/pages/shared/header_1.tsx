import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import Logo from '../../../public/logohitam.png';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';
import { doRequestGetProfile } from "@/pages/redux/users-schema/action/actionReducer";
import jwt, { JwtPayload } from 'jsonwebtoken';
import defaultImage from '../../images/default-avatar.jpg';
import { useRouter } from "next/router";

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
    label: "Cart",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const logoutAuth = async (id: any) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const port = 'http://localhost:3003/images/user-image/';
  const { profile }: any = useSelector((state: any) => state.settingReducers);
  const [profileImage, setProfileImage] = useState(''); 

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

function ProfileMenu() {
  const router = useRouter()
  const dispatch = useDispatch()
  const port = 'http://localhost:3003/images/user-image/';
  const { profile }: any = useSelector((state: any) => state.settingReducers);
  const [profileImage, setProfileImage] = useState('');  

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  let decoded: any;
  const [adatoken, setAdatoken] = useState<any>()
  const token:any = Cookies.get('access_token');

  useEffect(()=>{
    setAdatoken(token);
  }, [token])


  useEffect(() => {
    if (token) {
      try {
        decoded = jwt.decode(token) as JwtPayload;
        dispatch(doRequestGetProfile(decoded.user_entity_id));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('tokens not found');
    }

    if (profile && profile.user_photo) {
      setProfileImage(`${port}${profile.user_photo}`);
    } else {
      setProfileImage(defaultImage.src);
    }
  }, [profile?.user_photo]);

  return (
    <>
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
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="candice wu"
              className="border border-blue-500 p-0.5"
              src={profileImage}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
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
        </MenuList>
      </Menu>
    )}
    </>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];

const hiringMenu = [
  "Our Graduates",
  "Professional Hiring"
]

const aboutMenu = [
  "Alumni Testimoni",
  "About Us"
]

const courseMenu = [
  "Programming",
  "Development",
  "Mobile",
  "UI/UX Design",
  "Machine Learning",
  "Data Scientist",
  "Database",
  "Digital Marketing"
]

const bootcampRegularMenu = [
  "NodeJS Fullstack",
  "Java Fullstack",
  ".Net Fullstack",
  "Golang Fullstack",
  "Android Mobile",
  "Flutter"
]

const bootcampOnlineMenu = [
  "NodeJS Fullstack",
  "Golang Fullstack",
  "Android Mobile",
  "Flutter"
]

const bootcampCorporateMenu = [
  ".Net Technology"
]


function NavListHiring() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full text-sm"
            >
              Job Hiring{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-fit overflow-visible lg:grid"
        >
          <List>
            {hiringMenu.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}
function NavListBootcamp() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              Bootcamp{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-fit overflow-visible lg:grid"
        >
          <List>
            <ListItem>Bootcamp Regular</ListItem>
            <ListItem>Bootcamp Online</ListItem>
            <ListItem>Bootcamp Corporate</ListItem>
          </List>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}
function NavListCourse() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              Online Course{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-fit overflow-visible lg:grid"
        >
          <List>
            {courseMenu.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}
function NavListAbout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              About Us{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-fit overflow-visible lg:grid"
        >
          <List>
            {aboutMenu.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListBootcamp />
      <NavListCourse />
      <NavListHiring />
      <NavListAbout />
    </ul>
  );
}
 
export default function ComplexNavbar() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
 
  return (
    <Navbar className="shadow-none mx-auto rounded-none p-2 lg:px-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Image src={Logo} alt="Logo" className="h-8 w-auto" />
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
        <div className="absolute right-0">
          <div className="flex gap-3">
            <ProfileMenu />
          </div>
        </div>
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}