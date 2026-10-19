import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { useUserAuth } from '../../hooks/useUserAuth';

const DashboardLayout = ({children, activeMenu}) => {
    const {user} = useContext(UserContext);
    useUserAuth();

    if (!user) {
        return null;
    }

  return (
    <div className="">
        <Navbar activeMenu={activeMenu} />

        <div className="flex">
            <div className="max-[1025px]:hidden">
                <SideMenu activeMenu={activeMenu} />
            </div>

            <div className="grow mx-5">{children}</div>
        </div>
    </div>
  );
};

export default DashboardLayout;