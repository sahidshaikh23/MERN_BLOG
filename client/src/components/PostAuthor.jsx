import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});
  const [istCreatedAt, setIstCreatedAt] = useState("");

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };
    getAuthor();
  }, [authorID]);

  useEffect(() => {
    // Convert UTC timestamp to IST date without time
    const utcDate = new Date(createdAt);
    const istDate = utcDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    setIstCreatedAt(istDate);
  }, [createdAt]);

  // Function to calculate time difference
  const getTimeDifference = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(daysDifference / 365);

    if (yearsDifference >= 1) {
      return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''} ago`;
    } else if (monthsDifference >= 1) {
      return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
    } else if (daysDifference >= 1) {
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    } else if (hoursDifference >= 1) {
      return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } else if (minutesDifference >= 1) {
      return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    } else {
      return `${secondsDifference} second${secondsDifference > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Link to={`posts/users/${authorID}`} className="post__author">
      <div className="post__author-avatar">
        {author.avatar && (
          <img
            src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`}
            alt=""
          />
        )}
      </div>
      <div className="post__author-details">
        <h5> By : {author.name}</h5>
        <small>{getTimeDifference(createdAt)}</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
