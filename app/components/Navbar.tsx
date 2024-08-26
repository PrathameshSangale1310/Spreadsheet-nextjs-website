'use client'
import React from 'react';
import { Disclosure} from '@headlessui/react';
import { ArrowUturnLeftIcon, ArrowUturnRightIcon, PlusIcon } from '@heroicons/react/24/solid';

interface NavbarProps {
  undo: () => void;
  redo: () => void;
  addRow: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ undo, redo, addRow }) => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 my-3">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h2 className='text-white cursor-pointer'>
                Spreadsheet
              </h2>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            

            <button
              type="button"
              onClick={undo}
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mx-2"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Undo</span>
              <ArrowUturnLeftIcon className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={redo}
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Redo</span>
              <ArrowUturnRightIcon className="h-6 w-6" />
            </button>

            
          </div>
        </div>
      </div>

      
    </Disclosure>
  );
};

export default Navbar;
