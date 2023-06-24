import { useEffect, useState } from "react";
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const NavBar = () => {
  {
    /* Hamburger Button */
  }
  const [isActive, setIsActive] = useState(false);

  const handleHamOnClick = () => {
    setIsActive(!isActive);
    toggleBodyScroll();
  };

  {
    /* Navbar Fixed */
  }
  const [isFixed, setIsFixed] = useState(false);

  const toggleBodyScroll = () => {
    const body: any = document.querySelector("body");
    body.classList.toggle("scroll-lock");
  };

  useEffect(() => {
    const handleScroll = () => {
      const header: any = document.querySelector("header");
      const fixedNav = header.offsetTop;

      if (window.pageYOffset > fixedNav) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------------------------------------------------------------------------------- */
  //COBA KODE
  const programs: MenuProps["items"] = [
    {
      key: "1",
      type: "group",
      label: "Programs",
      children: [
        {
          type: "divider",
          className: "thick-divider",
        },
        {
          key: "1",
          label: "Bootcamp Regular", //Program>SubMenu
          children: [
            {
              key: "1-1",
              label: "NodeJS Fullstack",
            },
            {
              key: "1-2",
              label: "Java Fullstack",
            },
            {
              key: "1-3",
              label: ".NET Fullstack",
            },
            {
              key: "1-4",
              label: "Golang Fullstack",
            },
            {
              type: "divider",
              className: "thick-divider",
            },
            {
              key: "1-5",
              label: "Android Mobile",
            },
            {
              key: "1-6",
              label: "Flutter",
            },
          ],
        },
        {
          key: "2",
          label: "Bootcamp Online", //Program>SubMenu
          children: [
            {
              key: "2-1",
              label: "NodeJS Fullstack",
            },
            {
              key: "2-2",
              label: "Golang Fullstack",
            },
            {
              type: "divider",
              className: "thick-divider" // menggunakan tipe 'divider'
            },
            {
              key: "2-3",
              label: "Android Mobile",
            },
            {
              key: "2-4",
              label: "Flutter",
            },
          ],
        },
        {
          key: "3",
          label: "Bootcamp Corporate", //Program>SubMenu
          children: [
            {
              key: "3-1",
              label: ".Net Technology",
            },
          ],
        },
      ],
    },
  ];

  const online_course: MenuProps["items"] = [
    {
      key: "1",
      type: "group",
      label: "Online Course",
      children: [
        {
          type: "divider",
          className: "thick-divider",
        },
        {
          key: "1",
          label: "Programming", //Program>SubMenu
        },
        {
          key: "2",
          label: "Development", //Program>SubMenu
        },
        {
          key: "3",
          label: "Mobile", //Program>SubMenu
        },
        {
          key: "4",
          label: "UI/UX Design", //Program>SubMenu
        },
        {
          type: "divider",
          className: "thick-divider",
        },
        {
          key: "5",
          label: "Machine Learning", //Program>SubMenu
        },
        {
          key: "6",
          label: "Data Scientist", //Program>SubMenu
        },
        {
          type: "divider",
          className: "thick-divider",
        },
        {
          key: "7",
          label: "Database", //Program>SubMenu
        },
        {
          type: "divider",
          className: "thick-divider",
        },
        {
          key: "8",
          label: "Digital Marketing", //Program>SubMenu
        },
      ],
    },
  ];

  const hiring: MenuProps["items"] = [
    {
      key: "1",
      type: "group",
      label: "Hiring",
      children: [
        {
          type: "divider",
          className: "thick-divider",
        },
        {
          key: "1",
          label: "Our Graduates", //Program>SubMenu
        },
        {
          type: "divider",
          className: "thick-divider",
        },
        {
          key: "2",
          label: <a href="/jobs">Professional Hiring</a>, //Program>SubMenu
        },
      ],
    },
  ];

  const about: MenuProps["items"] = [
    {
      key: "1",
      type: "group",
      label: "About",
      children: [
        {
          type: "divider",
          className: "thick-divider",
        },
        {
          key: "1",
          label: "Alumni Testimoni", //Program>SubMenu
        },
        {
          key: "2",
          label: "About Us", //Program>SubMenu
        },
      ],
    },
  ];

  /* ---------------------------------------------------------------------------------------- */
  return (
    <div>
      <header
        className={`bg-transparent absolute top-0 left-0 w-full flex items-center z-10 ${
          isFixed ? "navbar-fixed" : ""
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              {/* {/LOGO/} */}
              <a
                href="/"
                className="font-bold text-lg block text-blue-500 py-6"
              >
                CodeXAcademy
              </a>
            </div>
            <div className="flex items-center px-4">
              <button
                onClick={handleHamOnClick}
                id="hamburger"
                className={`z-50 block absolute right-4 lg:hidden ${
                  isActive ? "hamburger-active " : ""
                }`}
              >
                <span
                  className={`hamburger-line transition duration-300 ease-in-out origin-top-left ${
                    isActive ? "hamburger-line-white " : ""
                  }`}
                ></span>
                <span className="hamburger-line transition duration-300 ease-in-out"></span>
                <span
                  className={`hamburger-line transition duration-300 ease-in-out origin-bottom-left ${
                    isActive ? "hamburger-line-white " : ""
                  }`}
                ></span>
              </button>

              {isActive && (
                <div
                  className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-40 lg:bg-transparent"
                  onClick={handleHamOnClick}
                ></div>
              )}

              <div
                className={`z-40 fixed w-56 h-screen bg-blue-500 top-0 right-0 transform transition-transform duration-400 ease-in-out lg:block lg:static lg:bg-transparent lg:shadow-none lg:rounded-none lg:w-full lg:h-min ${
                  isActive
                    ? "translate-x-0"
                    : "lg:translate-x-0 translate-x-full"
                }`}
              >
                <ul className="block pt-20 lg:pt-0">
                  <div className="mx-2 divide-y-[1px] lg:divide-none lg:flex">
                    <div className="pb-2 lg:pb-0 lg:flex lg:order-last">
                      <li className="group lg:pl-10 ">
                        <button className="text-nav2 ">Sign In</button>
                      </li>
                      <li className="group">
                        <button className="text-nav2">Sign Up</button>
                      </li>
                    </div>

                    <div className="text-white lg:text-base pt-3 pl-8 lg:pl-0 lg:pt-0 text-lg lg:flex lg:items-center lg:gap-12 font-semibold lg:text-black">
                      <Dropdown
                        menu={{ items: programs }}
                        placement="bottomCenter"
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space className="gap-nav">
                            Programs
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>

                      <Dropdown
                        menu={{ items: online_course ,}}
                        placement="bottomCenter"
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space className="gap-nav">
                            Online Course
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>

                      <Dropdown
                        menu={{ items: hiring }}
                        placement="bottomCenter"
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space className="gap-nav">
                            Job Hiring
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>

                      <Dropdown
                        menu={{ items: about }}
                        placement="bottomCenter"
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space className="gap-nav">
                            About
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default NavBar;