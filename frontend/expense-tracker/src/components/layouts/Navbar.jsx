import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuMoon, LuSun } from "react-icons/lu";
import SideMenu from "./SideMenu";
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Navbar = ({activeMenu}) => {
  const { user, updateUser } = useContext(UserContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isSideMenuMounted, setIsSideMenuMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => (user?.theme || localStorage.getItem("theme")) === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleThemeToggle = async () => {
    const previousTheme = isDarkMode ? "dark" : "light";
    const nextTheme = isDarkMode ? "light" : "dark";

    setIsDarkMode(nextTheme === "dark");
    updateUser({ ...user, theme: nextTheme });

    try {
      await axiosInstance.put(API_PATHS.AUTH.UPDATE_THEME, { theme: nextTheme });
    } catch (error) {
      setIsDarkMode(previousTheme === "dark");
      updateUser({ ...user, theme: previousTheme });
      console.error("Failed to save theme preference:", error);
    }
  };

  return (
  <div className="flex items-center justify-between bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
    <div className="flex items-center gap-5">
      <button
        className="block lg:hidden text-black"
        aria-label={openSideMenu ? "Close menu" : "Open menu"}
        onClick={() => {
          if (!openSideMenu) setIsSideMenuMounted(true);
          setOpenSideMenu((isOpen) => !isOpen);
        }}>
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
        </button>

      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
    </div>

    <button
      type="button"
      role="switch"
      aria-checked={isDarkMode}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      onClick={handleThemeToggle}
      className="flex items-center gap-2 text-gray-700"
    >
      {isDarkMode ? <LuMoon aria-hidden="true" /> : <LuSun aria-hidden="true" />}
      <span className={`relative h-6 w-11 rounded-full transition-colors ${isDarkMode ? "bg-purple-200" : "bg-gray-300"}`}>
        <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full transition-transform ${isDarkMode ? "translate-x-5 bg-purple-600" : "translate-x-0 bg-white"}`} />
      </span>
    </button>

          {isSideMenuMounted && (
            <div
              className={`fixed top-15.25 -ml-4 bg-white ${openSideMenu ? "side-menu-slide-in" : "side-menu-slide-out"}`}
              onAnimationEnd={(event) => {
                if (event.animationName === "side-menu-slide-out") {
                  setIsSideMenuMounted(false);
                }
              }}
            >
              <SideMenu activeMenu={activeMenu} />
            </div>
          )}
    </div>
  );
};

export default Navbar;