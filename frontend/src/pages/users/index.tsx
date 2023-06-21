import * as React from 'react';
import image from '../../../public/img/default.jpg';
import BreadcrumbsSlice from '../shared/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doRequestGetUser } from '../redux/users-schema/action/actionReducer';
import { AiOutlineSearch } from 'react-icons/ai';
import EditUsers from './edit-users';
import { notifySuccess } from '../alert';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useRouter } from 'next/router';

const IndexUsers = () => {
  //Fn Untuk Reducer
  const port = 'http://localhost:7300/';
  const dispatch = useDispatch();
  const router = useRouter();
  const { users, refresh, message, status } = useSelector(
    (state: any) => state.userReducers
  );

  //State Untuk Dapat Id User
  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState(null);
  // End
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const isNotAdmin = () => {
    let decoded: any;
    const token = Cookies.get('access_token');

    if (token) {
      try {
        decoded = jwt.decode(token) as JwtPayload;

        if (decoded.user_current_role !== 1) {
          router.push('/error-page/error-403');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('tokens not found');
    }
  };

  useEffect(() => {
    dispatch(doRequestGetUser());
    isNotAdmin();

    if (message && status === 200) {
      setTimeout(() => {
        notifySuccess('success', message);
      }, 200);
    }
  }, [dispatch, refresh]);

  useEffect(() => {
    if (Array.isArray(users)) {
      const filteredData: any = users.filter(
        (data: any) =>
          data?.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data?.users_emails[0].pmail_address
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          data?.users_roles[0].role.role_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredData);
    }
  }, [users, searchTerm]);

  return (
    <>
      <BreadcrumbsSlice />
      <section className="antialiased bg-gray-100 text-gray-600 h-screen w-full mt-3">
        <ToastContainer />
        <div className="flex flex-col justify-center">
          <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">USERS</h2>
            </header>
            <div className="flex">
              <div className="relative flex items-center ml-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <AiOutlineSearch className="w-4" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="text-sm rounded-lg block w-full pl-8 p-2.5 ring-1 lg:w-[17rem]"
                  value={searchTerm}
                  onChange={handleSearch}
                  autoComplete="off"
                />
              </div>
              {/* 
              <button className="ml-2 text-white px-4 py-2 border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500 uppercase hover:bg-blue-500">
                SEARCH
              </button> 
              */}
            </div>

            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Username</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Email</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Role</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {/* {users.map((data: any, index: any) => (  */}
                    {filteredUsers?.map((data: any, index: any) => (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              {data && data?.user_photo ? (
                                <img
                                  src={`${port}${data.user_photo}`}
                                  alt={data?.user_photo}
                                  className="rounded-full"
                                />
                              ) : (
                                <img
                                  src={image.src}
                                  alt={data && data?.user_photo}
                                  className="rounded-full"
                                />
                              )}
                            </div>
                            <div className="font-medium text-gray-800">
                              {data?.user_name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {data?.users_emails[0].pmail_address}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-blue-500">
                            {data?.users_roles[0].role.role_name}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">
                            {' '}
                            <button
                              onClick={() => {
                                setIsEdit(true);
                                setUserId(data.user_entity_id);
                              }}
                              className="ml-2 text-white px-4 py-2 border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500 hover:bg-blue-500"
                            >
                              Edit
                            </button>{' '}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isEdit ? (
        <EditUsers
          userId={userId}
          show={isEdit}
          closeModal={() => setIsEdit(false)}
        />
      ) : (
        ''
      )}
    </>
  );
};
export default IndexUsers;
