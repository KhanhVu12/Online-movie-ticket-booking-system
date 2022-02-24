import React from 'react'
import { AiFillHome } from 'react-icons/ai';
import { MdTimeline, MdTrendingUp } from 'react-icons/md';

export const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h2 className="sidebarTitle">Menu</h2>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <AiFillHome className='sidebarIcon'/>
                        Home
                    </li>
                    <li className="sidebarListItem">
                      <MdTimeline className='sidebarIcon'/>
                      Analytics
                    </li>
                    <li className="sidebarListItem">
                      <MdTrendingUp className='sidebarIcon'/>
                      Sales
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
