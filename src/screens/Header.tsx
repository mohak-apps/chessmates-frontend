import { useAuthContext } from "@/contexts/UserAuthContext";
import { Bell, EggFriedIcon, Settings, User, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SettingsBox = () => {
  const { logOut } = useAuthContext();

  return (
    <div className="absolute right-0 w-48 rounded-md shadow-lg z-10">
      <div className="bg-sidePanel shadow-lg box border-sidePanelShadow border-2">
        <ul className="">
          <li
            className="hover:bg-sidePanelShadow py-2 px-2 cursor-pointer"
            onClick={logOut}
          >
            Profile
          </li>
          <li
            className="hover:bg-sidePanelShadow py-2 px-2 cursor-pointer"
            onClick={logOut}
          >
            Log Out
          </li>
          <li
            className="hover:bg-sidePanelShadow py-2 px-2 cursor-pointer"
            onClick={() => {}}
          >
            Home
          </li>
        </ul>
      </div>
    </div>
  );
};

const FriendsBox = () => {
  const { logOut } = useAuthContext();

  return (
    <div className="absolute right-0 w-48 rounded-md shadow-lg z-10">
      <div className="bg-sidePanel shadow-lg box border-sidePanelShadow border-2">
        <ul className="">
          <li
            className="hover:bg-sidePanelShadow py-2 px-2 cursor-pointer"
            onClick={logOut}
          >
            Profile
          </li>
          <li
            className="hover:bg-sidePanelShadow py-2 px-2 cursor-pointer"
            onClick={logOut}
          >
            Log Out
          </li>
          <li
            className="hover:bg-sidePanelShadow py-2 px-2 cursor-pointer"
            onClick={() => {}}
          >
            Home
          </li>
        </ul>
      </div>
    </div>
  );
};

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const menuRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-header text-white justify-evenly items-center px-4 border-b border-white flex">
      <div className="flex-1">
        {/* This empty div helps push the center content to the middle */}
      </div>
      <div className="text-xl">ChessMates</div>
      <div className="flex-1 flex justify-end">
        <div className="relative px-5" ref={menuRef}>
          <Users
            className=" text-buttonBackground2 hover:text-buttonHover2"
            onClick={() => setShowSettings(!showSettings)}
          />
          {showSettings ? <FriendsBox /> : null}
        </div>
        <div className="relative px-5" ref={menuRef}>
          <Bell
            className=" text-buttonBackground2 hover:text-buttonHover2"
            onClick={() => setShowSettings(!showSettings)}
          />
          {showSettings ? <FriendsBox /> : null}
        </div>
        <div className="relative px-5" ref={menuRef}>
          <Settings
            className=" text-buttonBackground2 hover:text-buttonHover2"
            onClick={() => setShowSettings(!showSettings)}
          />
          {showSettings ? <SettingsBox /> : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
