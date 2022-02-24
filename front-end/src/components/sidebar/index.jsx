import React from 'react'
import { BiMessageRounded } from 'react-icons/bi'
import { IoTicketOutline } from 'react-icons/io5';
import { RiSuitcaseLine } from 'react-icons/ri';
import { AiOutlineHome, AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { MdTimeline, MdTrendingUp, MdDynamicFeed, MdOutlineReport } from 'react-icons/md';

export const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <AiOutlineHome className='sidebarIcon'/>
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
            <li className="sidebarListItem">
              <AiOutlineUser className='sidebarIcon' />
              User
            </li>
            <li className="sidebarListItem">
              <IoTicketOutline className='sidebarIcon' />
              Product
            </li>
            <li className="sidebarListItem">
              <AiOutlineMail className='sidebarIcon' />
              Mail
            </li>
            <li className="sidebarListItem">
              <MdDynamicFeed className='sidebarIcon' />
              Feedback
            </li>
            <li className="sidebarListItem">
              <BiMessageRounded className='sidebarIcon' />
              Message
            </li>
            <li className="sidebarListItem">
              <RiSuitcaseLine className='sidebarIcon' />
              Manage
            </li>
            <li className="sidebarListItem">
              <MdOutlineReport className='sidebarIcon' />
              Report
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
