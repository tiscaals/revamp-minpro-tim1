import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import BreadcrumbsSlice from '../shared/breadcrumbs';
import { doRequestGetUser } from '../redux/users-schema/action/actionReducer';

const UserIndex = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { users } = useSelector((state: any) => state.userReducers);

  useEffect(() => {
    dispatch(doRequestGetUser());
  }, []);

  return (
    <>
      <BreadcrumbsSlice />

      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" color="blue" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add user
            </Button>
          </div>
        </CardHeader>

        <CardBody className="overflow-scroll px-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(users) &&
                users.map((dt, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{dt.user_name}</td>
                    <td className="py-2 px-4">
                      {dt.users_emails &&
                        dt.users_emails[0] &&
                        dt.users_emails[0].pmail_address}
                    </td>
                    <td className="py-2 px-4">
                      {dt.users_roles &&
                        dt.users_roles[0] &&
                        dt.users_roles[0].role.role_name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" color="blue-gray" size="sm">
              Previous
            </Button>
            <Button variant="outlined" color="blue-gray" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserIndex;
