"use client"

import React, { useEffect } from 'react'
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({children} : {children: React.ReactNode}) => {
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    
    useEffect(() =>{
        if(isDarkMode){
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
        }
    })

    
    return (
    // Make side Bar Nav display flex with main section E.g. [][] 
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
        <Sidebar />
        <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
            isSidebarCollapsed ? "" : "md:pl-64"}`}>
            <Navbar />
            {children}
        </main>
    </div>
  )
}

const DashBoardWrapper = ({children} : {children: React.ReactNode}) => {
    return (
        <StoreProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </StoreProvider>
    )
} 
export default DashBoardWrapper;

