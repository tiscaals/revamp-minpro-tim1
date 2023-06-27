import { Fragment, useEffect, useState } from 'react';
// import Image from 'next/image';
// import gambar from '../../images/4500_1_01.jpg';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiEdit, BiMessageAltDetail } from 'react-icons/bi';
import { useRouter } from 'next/router';
// import SwitchDetail from './switchdetail';
// import Detail from './detail';
import { useDispatch, useSelector } from 'react-redux';
import {
  reqplacement,
  reqtalents,
} from '../../redux/hr-schema/action/actionReducer';
import JoinPlacement from './joinplacement';
const profile:string = 'http://localhost:3003/profile/'

const Placement = () => {
  let { placement, talents, message, status, refresh } = useSelector(
    (state: any) => state.hrReducers
  );

  let dispatch = useDispatch();
  const router = useRouter();

  // const [placement, setPlacement] = useState();
  // const [inputValue, setInput] = useState('');
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [isId, setIsId] = useState();
  // const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // const [isDelete, setIsDelete] = useState(false);
  // const [data, setData] = useState('');

  useEffect(() => {
    dispatch(reqtalents());
  }, [refresh]);

  // console.log(talents);

  function StarRating({ rating }: { rating: number }) {
    const totalStars = 5;
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    return (
      <div className="flex">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={index} className="mr-1 mb-3 text-yellow-400" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="mr-1 mb-3 text-yellow-400" />}
        {Array.from(
          { length: totalStars - fullStars - (hasHalfStar ? 1 : 0) },
          (_, index) => (
            <FaStar
              key={index + fullStars + (hasHalfStar ? 1 : 0)}
              className="mr-1 text-gray-400"
            />
          )
        )}
      </div>
    );
  }

  return (
    <>
      <div className=" max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <form>
          <div className="flex">
            <label className="block mb-2 text-sm font-medium text-gray-900 "></label>
            <select
              id="Status"
              className="-z-1 flext inline-block items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            >
              <option>Status</option>
              <option value="#">On Bootcamp</option>
              <option value="#">Idle</option>
              <option value="#">Trial</option>
              <option value="#">Placement</option>
            </select>
            <div className="relative w-full">
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 "
                  placeholder="Talent name, technology, batch, ..."
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="grid grid-cols-2 gap-10 pt-2 xl:grid-cols-3 2xl:grid-cols-4">
          {(talents || []).map((dtl: any, index: any) => (
            <div
              key={dtl.user_entity_id}
            //   className="border-solid border-2 border-sky-500 h-96 w-60 justify-center"
            >
              <label>ID = {dtl.user_entity_id} </label>
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  src={`${profile}${dtl.user_photo}`}
                  alt="profile"
                  className="h-64 w-80 rounded-t-lg object-cover object-center"
                // className="h-full w-full rounded-t-lg object-cover object-center lg:h-full lg:w-full"
                />

                {/* <Image
                  src={dp.user_photo}
                  alt={dp.user_photo}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                /> */}
                <div className="p-2">
                  <a href="#">
                    <h3 className="mb-0 text-2xl font-bold tracking-tight text-gray-900">
                      {`${dtl.user_first_name} ${dtl.user_last_name}`}
                    </h3>
                  </a>
                  <p className="mb-0 text-gray-500">{dtl.talent_status}</p>
                  <div className="grid grid-cols-2 mb-2 text-sm text-gray-800 font-sans font-semibold">
                    <h6>{dtl.batch_name}</h6>
                    <h6 className="text-center">{dtl.talent_skill}</h6>
                  </div>

                  <StarRating rating={5} />
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 border-gray-200">
                    <button
                      onClick={() => {
                        setIsJoin(true);
                        setIsId(dtl);
                      }}
                      className="col-span-2 text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                    //   className="col inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Join Placement
                    </button>
                    <div>
                      {/* <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <BsThreeDotsVertical
                              className="ml-2 -mr-1 text-gray-700 hover:text-gray-400 sm:flex"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      setIsAction(true);

                                      setIsId(dtl.id);
                                    }}
                                    className={`${active
                                        ? 'bg-blue-gray-700 text-white'
                                        : 'text-gray-700'
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <BiEdit
                                        className="mr-2 h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <BiEdit
                                        className="mr-2 h-5 w-5 text-gray-700"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Switch Action
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      setIsDetail(true);

                                      setIsId(dtl.id);
                                    }}
                                    className={`${active
                                        ? 'bg-blue-gray-700 text-white'
                                        : 'text-gray-700'
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <BiMessageAltDetail
                                        className="mr-2 h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <BiMessageAltDetail
                                        className="mr-2 h-5 w-5 text-gray-700"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Detail
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* {isAction ? (
        <SwitchDetail
          show={isAction}
          data={isId}
          closeModal={() => setIsAction(false)}
        />
      ) : (
        ''
      )}
      {isDetail ? (
        <Detail
          show={isDetail}
          data={isId}
          closeModal={() => setIsDetail(false)}
        />
      ) : (
        ''
      )} */}
      {isJoin ? (
        <JoinPlacement
          show={isJoin}
          data={isId}
          closeModal={() => setIsJoin(false)}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Placement;
