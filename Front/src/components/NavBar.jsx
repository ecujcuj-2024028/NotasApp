import React from 'react';
import { PlusIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-base-content/10 bg-base-100/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <NavLink className="text-3xl font-bold" to="/">
                    TodoApp
                </NavLink>
                
                <NavLink className="btn btn-soft btn-primary font-bold text-[1.1em]" to="/createNote">
                    <PlusIcon />
                    Crear una nota
                </NavLink>
            </div>
        </header>
    );
};

export default NavBar;
