import { forwardRef, LegacyRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import logo from "/logo-codex.png";
import CottageIcon from "@mui/icons-material/Cottage";
import GroupIcon from "@mui/icons-material/Group";

const SideBar = forwardRef(({}, ref: LegacyRef<HTMLDivElement>) => {
  const route = useRouter();
  const listMenu = [
    { to: "/", path: "/", icon: <CottageIcon />, name: "Dashboard" },
    { to: "#", path: "#", icon: <GroupIcon />, name: "Candidate" },
    { to: "#", path: "#", icon: <GroupIcon />, name: "Batchs" },
    { to: "#", path: "#", icon: <GroupIcon />, name: "Talent" },
    { to: "#", path: "#", icon: <GroupIcon />, name: "Curriculum" },
    { to: "#", path: "#", icon: <GroupIcon />, name: "Assignment" },
    { to: "/jobs", path: "/jobs", icon: <GroupIcon />, name: "Posting Hiring" },
    { to: "/client", path: "/client", icon: <GroupIcon />, name: "Client" },
  ];

  return (
    <div ref={ref} className="z-50 fixed w-56 h-full bg-blue-500">
      <div className="flex justify-center mt-6 mb-14">
        <a href="/" className="font-bold text-lg block text-white py-6">
          CodeXAcademy
        </a>
      </div>

      <div className="flex flex-col">
        {(listMenu || []).map((mn) => (
          <Link href={`${mn.to}`}>
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                route.pathname == mn.path
                  ? "bg-blue-100 text-blue-500"
                  : "text-white hover:bg-blue-100 hover:text-blue-500"
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

SideBar.displayName = "SideBar";

export default SideBar;
