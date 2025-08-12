import React from 'react'
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = ({ toggleForm }) => {

    const [theme, setTheme] = useState("light");
    const [rotating, setRotating] = useState(false); // animation flag

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initialTheme = prefersDark ? "dark" : "light";
            setTheme(initialTheme);
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    }, []);

    const toggleTheme = () => {
        setRotating(true); // start rotation animation

        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);

        // stop rotation after animation
        setTimeout(() => setRotating(false), 500);
    };

    return (
        <header className='bg-white shadow-xl pb-2 dark:bg-gray-800 transition-colors duration-300'>
            <div>
                <div className='flex items-center justify-between'>
                    <h1 className='px-10 text-2xl font-semibold'>📅 Task <a className='text-red-500'>Board</a></h1>
                    <div className='flex gap-6 px-10'>
                        <button className='bg-red-500 mt-4 mb-1 px-4 rounded-lg font-semibold text-lg' onClick={toggleForm}>Add New Task</button>
                        <button
                            onClick={toggleTheme}
                            className="mt-4 mb-1 p-3 rounded-full bg-gray-200 dark:bg-gray-700 ">
                            {theme === "light" ? (
                                <FaMoon
                                    className={`theme-icon ${rotating ? "rotate" : ""}`}
                                    size={24}
                                    color="#1e293b"
                                />
                            ) : (
                                <FaSun
                                    className={`theme-icon ${rotating ? "rotate" : ""}`}
                                    size={24}
                                    color="#fbbf24"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header