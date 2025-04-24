import Sidebar from "@/component/Sidebar";
import VideoCard from "@/component/VideoCard";
import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/features/auth/authAsync";
const cx = classNames.bind(styles);

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.currentUser);

  const videos = [
    {
      id: 1,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user1",
      likes: 1000,
      comments: 200,
      caption: "Đây là video đầu tiên!",
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      videoUrl:
        "https://www.pexels.com/vi-vn/video/thien-nga-thanh-th-n-l-t-tren-h-killarney-31225606/",
      username: "user2",
      likes: 500,
      comments: 50,
      caption: "Video thứ hai nè!",
      thumbnail: "https://picsum.photos/200/300",
    },
  ];

  return (
    <div className={cx("app")}>
      <div className={cx("main-content")}>
        <Sidebar />
        <div className={cx("video-feed")}>
          {user ? <h1>Xin chào {user.firstName} </h1> : ""}
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        {/* <SuggestedAccounts /> */}
      </div>
    </div>
  );
}

export default Home;
