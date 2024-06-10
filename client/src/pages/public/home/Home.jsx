import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const BASE_URL = "http://localhost:5000/api/v1";
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const result = await axios.get(`${BASE_URL}/posts/public-posts`);
        setPostData(result.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAllPost();
  }, []);

  return (
    <div className="max-w-screen-xl   items-center justify-between mx-auto p-4">
      <h1 className="font-bold text-2xl mb-4">Posts</h1>

      {postData.map((post, index) => (
        <div key={index} className="my-4">
          <label className="font-bold text-wrap">{post.title}</label>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
