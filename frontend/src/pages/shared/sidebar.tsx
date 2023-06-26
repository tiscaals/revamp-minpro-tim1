import { forwardRef, LegacyRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '../../images/codexlogo.png';

import {
  MdCottage,
  MdGroup,
  MdShopTwo,
  MdCategory,
  MdViewModule,
  MdLocationOn,
  MdSportsMartialArts,
  MdGroups,
  MdAssignment,
  MdPostAdd,
  MdLibraryBooks,
  MdGroupAdd,
} from 'react-icons/md';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SideBar = forwardRef(({}, ref: LegacyRef<HTMLDivElement>) => {
  const [listMenu, setListMenu] = useState([
    { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
  ]);

  //Decode Token
  let decoded: any;
  const token = Cookies.get('access_token');
  //End

  useEffect(() => {
    if (token) {
      try {
        decoded = jwt.decode(token) as JwtPayload;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('tokens not found');
    }

    switch (decoded?.user_current_role) {
      //Admin
      case 1:
        setListMenu([
          { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
          { to: '/app/users', path: '/users', icon: <MdGroup />, name: 'User' },
          {
            to: '/category',
            path: '/category',
            icon: <MdCategory />,
            name: 'Category',
          },
          {
            to: '/skill',
            path: '/skill',
            icon: <MdSportsMartialArts />,
            name: 'Skill',
          },
          {
            to: '/modules',
            path: '/modules',
            icon: <MdViewModule />,
            name: 'Modules',
          },
          {
            to: '/locations',
            path: '/locations',
            icon: <MdLocationOn />,
            name: 'Locations',
          },
        ]);
        break;

      //Users
      case 2:
        setListMenu([
          { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
          {
            to: '/bootcamp/apply',
            path: '/bootcamp',
            icon: <MdGroup />,
            name: 'Apply Bootcamp',
          },
          {
            to: '/profesional/apply',
            path: '/profesional',
            icon: <MdGroup />,
            name: 'Apply Job',
          },
        ]);
        break;

      //Employee
      case 3:
        setListMenu([
          //MENU BLM TAU
          { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
          { to: '/user', path: '/user', icon: <MdGroup />, name: 'User' },
          {
            to: '/category',
            path: '/category',
            icon: <MdCategory />,
            name: 'Category',
          },
          {
            to: '/product',
            path: '/product',
            icon: <MdShopTwo />,
            name: 'Product',
          },
        ]);
        break;

      //Talent
      case 4:
        setListMenu([
          //MENU BLM TAU
          { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
          { to: '/user', path: '/user', icon: <MdGroup />, name: 'User' },
          {
            to: '/category',
            path: '/category',
            icon: <MdCategory />,
            name: 'Category',
          },
          {
            to: '/product',
            path: '/product',
            icon: <MdShopTwo />,
            name: 'Product',
          },
        ]);
        break;

      //trainer
      case 5:
        setListMenu([
          //MENU BLM TAU
          { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
          { to: '/user', path: '/user', icon: <MdGroup />, name: 'User' },
          {
            to: '/category',
            path: '/category',
            icon: <MdCategory />,
            name: 'Category',
          },
          {
            to: '/product',
            path: '/product',
            icon: <MdShopTwo />,
            name: 'Product',
          },
        ]);
        break;

      //recruiter

      case 7:
        setListMenu([
          { to: '/', path: '/', icon: <MdGroup />, name: 'Home' },
          {
            to: '/app/profesional/apply',
            path: '/users',
            icon: <MdGroup />,
            name: 'Apply Job',
          },
        ]);
      case 8:
        setListMenu([
          { to: '/', path: '/', icon: <MdGroup />, name: 'Home' },
          {
            to: '/app/batch',
            path: '/app/batch',
            icon: <MdGroup />,
            name: 'Batch',
          },
          {
            to: '/app/candidate',
            path: '/app/candidate',
            icon: <MdGroup />,
            name: 'Candidate',
          },
        ]);
        break;
      case 9:
        setListMenu([
          { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
          {
            to: '/candidate',
            path: '/app/candidate',
            icon: <MdGroupAdd />,
            name: 'Candidate',
          },
          {
            to: '/app/batch',
            path: '/app/batch',
            icon: <MdCategory />,
            name: 'Batch',
          },
          {
            to: '/app/talents',
            path: '/app/talents',
            icon: <MdGroups />,
            name: 'Talents',
          },
          {
            to: '/app/curriculum',
            path: '/app/curriculum',
            icon: <MdLibraryBooks />,
            name: 'Curriculum',
          },
          {
            to: '/app/assignment',
            path: '/app/assignment',
            icon: <MdAssignment />,
            name: 'Assignment',
          },
          {
            to: '/app/jobs',
            path: '/app/jobs',
            icon: <MdPostAdd />,
            name: 'Posting Hiring',
          },
          {
            to: '/app/bootcamp',
            path: '/bootcamp',
            icon: <MdPostAdd />,
            name: 'Bootcamp',
          },
        ]);
        break;
      default:
        setListMenu([
          { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
        ]);
        break;
    }

    // console.log(listMenu);
  }, []);
  const router = useRouter();

  return (
    <div
      ref={ref}
      className="fixed w-56 h-full bg-indigo-900 text-white shadow-sm z-10 py-4 px-6"
    >
      <div className="flex justify-center mt-4 mb-4">
        <Image className="w-full h-auto" src={logo} alt="company logo" />
      </div>

      <div className="md:flex-col md:min-w-full flex flex-col list-none">
        {(listMenu || []).map(mn => (
          <Link href={`${mn.to}`}>
            <div
              className={`rounded-sm px-3 py-3 text-xs uppercase font-bold flex items-center ${
                router.pathname == mn.path
                  ? 'bg-light-blue-100 text-indigo-500 hover:text-indigo-800'
                  : 'text-blue-gray-100 hover:text-blue-gray-300'
              }`}
            >
              <div className="mr-2">{mn.icon}</div>
              <div>
                <p>{mn.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
