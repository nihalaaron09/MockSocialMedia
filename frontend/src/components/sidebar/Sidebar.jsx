import CloseFriends from "../closeFriends/CloseFriends";
import { Users } from "../../dummyData";
import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VideocamIcon from "@mui/icons-material/Videocam";
import GroupIcon from "@mui/icons-material/Group";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarListItemIcon" />
            <span className="sideBarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatBubbleIcon className="sidebarListItemIcon" />
            <span className="sideBarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <VideocamIcon className="sidebarListItemIcon" />
            <span className="sideBarListItemText">Video</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className="sidebarListItemIcon" />
            <span className="sideBarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarksIcon className="sidebarListItemIcon" />
            <span className="sideBarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpCenterIcon className="sidebarListItemIcon" />
            <span className="sideBarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkIcon className="sidebarListItemIcon" />
            <span className="sideBarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className="sidebarListItemIcon" />
            <span className="sideBarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className="sidebarListItemIcon" />
            <span className="sideBarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"></hr>
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriends key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
