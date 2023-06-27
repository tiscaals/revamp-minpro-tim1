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
  MdWork,
  MdPayments,
} from 'react-icons/md';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { BsFillBookFill } from 'react-icons/bs';
import { FaList, FaMap, FaUserCheck, FaUsers, FaUserTie } from 'react-icons/fa';
import { GrContactInfo } from 'react-icons/gr';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiSolidUserDetail } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';

const SideBar = forwardRef(({}, ref: LegacyRef<HTMLDivElement>) => {
  const [listMenu, setListMenu] = useState([
    { to: '/app', path: '/app', icon: <MdCottage />, name: 'Home' },
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
          { to: '/app', path: '/app', icon: <MdCottage />, name: 'Home' },
          { to: '/app/users', path: '/app/users', icon: <MdGroup />, name: 'User' },
          {
            to: '/app/category',
            path: '/app/category',
            icon: <MdCategory />,
            name: 'Category',
          },
          {
            to: '/app/batch',
            path: '/app/batch',
            icon: <MdSportsMartialArts />,
            name: 'Batch',
          },
          {
            to: '/app/candidate',
            path: '/app/candidate',
            icon: <AiOutlineUsergroupAdd />,
            name: 'Candidate',
          },
          {
            to: '/app/client',
            path: '/app/client',
            icon: <HiUserGroup />,
            name: 'Client',
          },
          {
            to: '/app/curriculum',
            path: '/app/curriculum',
            icon: <BsFillBookFill />, 
            name: 'Curriculum',
          },
          {
            to: '/app/employee',
            path: '/app/employee',
            icon: <FaUsers />,
            name: 'Employee',
          },
          {
            to: '/app/jobs',
            path: '/app/jobs',
            icon: <MdWork/>,
            name: 'Jobs',
          },
          {
            to: '/app/locations',
            path: '/app/locations',
            icon: <MdLocationOn />,
            name: 'Locations',
          },
          {
            to: '/app/modules',
            path: '/app/modules',
            icon: <FaList />,
            name: 'Modules',
          },
          {
            to: '/app/payment',
            path: '/app/payment',
            icon: <MdPayments />,
            name: 'Payment',
          },
          {
            to: '/app/placement',
            path: '/app/placement',
            icon: <FaMap />,
            name: 'Placement',
          },
          {
            to: '/app/pro-candidate',
            path: '/app/pro-candidate',
            icon: <FaUserTie />,
            name: 'Pro-Candidate',
          },
          {
            to: '/app/skill',
            path: '/app/skill',
            icon: <BiSolidUserDetail />,
            name: 'Skill',
          },
          {
            to: '/app/talents',
            path: '/app/talents',
            icon: <FaUserCheck />,
            name: 'Talents',
          },
        ]);
        break;

      //HR
      case 6:
        setListMenu([
          { to: '/app', path: '/app', icon: <MdCottage />, name: 'Home' },
          {
            to: '/app/placement',
            path: '/app/placement',
            icon: <FaMap />,
            name: 'Placement',
          },
          {
            to: '/app/pro-candidate',
            path: '/app/pro-candidate',
            icon: <FaUserTie />,
            name: 'Pro-Candidate',
          },
          {
            to: '/app/employee',
            path: '/app/employee',
            icon: <FaUsers />,
            name: 'Employee',
          },
        ]);
        break;

      //Trainer
      case 8:
        setListMenu([
          { to: '/', path: '/', icon: <MdGroup />, name: 'Home' },
          {
            to: '/app/batch',
            path: '/app/batch',
            icon: <MdSportsMartialArts />,
            name: 'Batch',
          },
          {
            to: '/app/candidate',
            path: '/app/candidate',
            icon: <AiOutlineUsergroupAdd />,
            name: 'Candidate',
          },
          {
            to: '/app/talents',
            path: '/app/talents',
            icon: <FaUserCheck />,
            name: 'Talents',
          },
        ]);
        break;
      
      //Recruiter
      case 9:
        setListMenu([
          { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
          {
            to: '/app/batch',
            path: '/app/batch',
            icon: <MdSportsMartialArts />,
            name: 'Batch',
          },
          {
            to: '/app/jobs',
            path: '/app/jobs',
            icon: <MdWork/>,
            name: 'Jobs',
          },
          {
            to: '/app/candidate',
            path: '/app/candidate',
            icon: <AiOutlineUsergroupAdd />,
            name: 'Candidate',
          },
          {
            to: '/app/client',
            path: '/app/client',
            icon: <HiUserGroup />,
            name: 'Client',
          },
        ]);
        break;

      default:
        setListMenu([
          { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
        ]);
        break;
    }
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
