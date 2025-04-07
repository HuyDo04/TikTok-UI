import Navbar from "@/component/NavBar";
import Sidebar from "@/component/Sidebar";
import SuggestedAccounts from "@/component/SuggestedAccounts";
import VideoCard from "@/component/VideoCard";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home() {
  const [videos, setVideos] = useState([
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
  ]);

  return (
    <div className={cx("app")}>
      <Navbar />
      <div className={cx("main-content")}>
        <Sidebar />
        <div className={cx("video-feed")}>
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
