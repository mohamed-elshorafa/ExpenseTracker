import React from 'react';

const AuthLayout = ({children}) => {
  return <div className="flex">
        <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 flex flex-col justify-between h-screen">
            <h2 className="text-[35px] font-medium text-black">Expense Tracker</h2>
            {children}
        </div>

        <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
            {/* <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
            <div className="w-48 h-56 rounded-[40px] border-20 border-fuchsia-600 absolute top-[20%] -right-10" />
            <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" /> */}

            <div className="absolute inset-0 z-20 flex items-center justify-center px-8 text-center">
                <h1
                    className="text-5xl font-bold leading-20 text-primary md:text-6xl"
                    style={{ WebkitTextStroke: '0px black' }}
                >
                    <span className="block">Track Your</span>
                    <span className="block">Income &amp; Expenses</span>
                </h1>
            </div>
        </div>
    </div>;
};

export default AuthLayout;