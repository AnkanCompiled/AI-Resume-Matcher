import React from 'react'
import { APP_NAME } from '../config/envConfig'
import { NavLink } from 'react-router-dom'

export default function NavigationComponent() {
    return (
        <nav className='flex justify-evenly items-center h-[80px] shadow-lg'>
            {/* Left Section - Logo and Navigation */}
            <div className='flex items-center space-x-10'>
                <div className="flex items-center space-x-4">
                    <span className='text-2xl font-semibold font-poppins lowercase'>{APP_NAME}</span>
                </div>
                <div className='flex items-center space-x-6'>
                    {Object.entries({ "Jobs": "/jobs", "About Us": "/about" }).map(([key, values], index) => (
                        <NavLink to={values} key={index} className={({ isActive }) =>
                            `relative h-[80px] min-w-[50px] flex justify-center items-center after:absolute after:left-0 after:bottom-0 after:contents-[""] after:bg-[#1E3A8A] ${isActive
                                ? 'after:w-full after:h-[5px]'
                                : 'group after:w-0 after:hover:w-full after:h-[5px] after:duration-200'
                            }`}>
                            <span className='text-md font-semibold text-secondary group-hover:text-[#1E3A8A]'>{key}</span>
                            <div className='hidden group-hover:block absolute top-full mt-2 p-4 border-2 rounded-md shadow-xl bg-white'>
                                {key === "Jobs" && (
                                    <div className='flex flex-col w-max'>
                                        <span className='text-sm font-semibold text-gray-700'></span>
                                        <span className='text-sm text-gray-500'>Click to learn more about jobs</span>
                                    </div>
                                )}
                                {key === "About Us" && (
                                    <div className='flex flex-col w-max'>
                                        <span className='text-sm font-semibold text-gray-700'>{APP_NAME}</span>
                                        <span className='text-sm text-gray-500'>Click to learn more about us</span>
                                    </div>
                                )}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Right Section - Registration Buttons */}
            <div className='flex items-center'>
                <button className='border-2 rounded-xl w-[100px] h-[50px] shadow-lg hover:bg-gray-100 duration-200'>
                    <span className='text-md font-semibold'>Login</span>
                </button>
                <button className='ml-4 bg-[#3B82F6] rounded-xl w-[100px] h-[50px]  shadow-md hover:bg-[#3469be] duration-200'>
                    <span className='text-md font-semibold text-white'>Register</span>
                </button>
            </div>
        </nav >
    )
}
