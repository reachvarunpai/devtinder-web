import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed); // Always an array now
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data || []));
    } catch (err) {
      console.error("Error fetching feed:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-col items-center my-10 gap-4">
      {feed.length > 0 ? (
        feed.map((user) => <UserCard key={user._id} user={user} />)
      ) : (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default Feed;
