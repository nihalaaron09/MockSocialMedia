import axios from "axios";
import { Link } from "react-router-dom";
import "./post.css";
import { useState, useEffect, useContext } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          URL + `/api/users/?userId=${post.userId}`
        );
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      console.log("before axios");
      await axios.put(URL + `/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
      console.log("after axios");
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src="http://192.168.1.159:4000/images/people/6.jpg"
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postTimestamp">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUpIcon
              onClick={likeHandler}
              style={{ marginRight: "5px", cursor: "pointer" }}
            />
            <FavoriteIcon
              onClick={likeHandler}
              style={{ marginRight: "5px", cursor: "pointer" }}
            />
            <span className="postReactionCounter">
              {like}
              {like === 1 ? " person liked this" : " people liked this"}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment}
              {post.comment === 1 ? " comment" : " comments"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
