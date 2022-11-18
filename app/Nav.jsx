'use client'
import React, { useState } from "react";
import { createContext } from 'react';
import SearchBox from './SearchBox'
export const SearchContext =createContext();

const SearchProvider=({children})=>{
 const [skw, setSkw] = useState('Next');

  const changeKw=(value)=>{
    if(value){
      setSkw(value);
    }
  };

  return(
  <>
  <SearchContext.Provider value={{skw,changeKw}}>
    {children}
  </SearchContext.Provider>  
  </>
  )
}


export const Nav = (props) => {
    
  return (
    <>
    <SearchProvider>
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabindex="0" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>

          <ul
            tabindex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/">Homepage</a>
            </li>
            <li>
              <a href="/">Portfolio</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a
          className=" font-extrabold   hover:text-purple-300  text-2xl uppercase"
          href="/"
        >
          Dev Talk
        </a>
      </div>
      <div className="navbar-end mr-5me">
        <SearchBox/>
            
        
       
      </div>
    </div>
    {props.children}
    </SearchProvider>
    </>
  );
};
