import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";
import React from "react";

export default function Rightbar({ user }) {
  const HomeRightbar = () => {
    return (
      <React.Fragment>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b style={{ fontWeight: "bold" }}>Bizzy Moore </b>and
            <b style={{ fontWeight: "bold" }}> 3 other friends </b>
            have birthdays today
          </span>
        </div>
        <img src="/assets/ad2.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">
          <b style={{ fontWeight: "bold" }}>Online Friends</b>
        </h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </React.Fragment>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <React.Fragment>
        <h4 className="rightbarTitle">User Information</h4>
        <hr className="righbarHr"></hr>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">City</span>
            <span className="rightBarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">From</span>
            <span className="rightBarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">Relationship status</span>
            <span className="rightBarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : ""}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <hr className="righbarHr"></hr>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={`${PF}people/1.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}people/2.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}people/4.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}people/5.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}people/7.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
