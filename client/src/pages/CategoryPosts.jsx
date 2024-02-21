import React, { useEffect, useState } from "react";
import Loder from '../components/Loader'
import PostItem from "../components/PostItem";
import { useParams } from "react-router-dom";
import axios from "axios";
function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const {category}=useParams();
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
        setPosts(response?.data)
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false)
    }
    fetchPosts();
  }, [category])

  if (isLoading) {
    return <Loder />
  }
  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({ _id: id, description, thumbnail, title, category, creator, createdAt }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              authorID={creator}
              createdAt={createdAt}
              description={description}
            />
          ))}

        </div>
      ) : (
        <h2 className="center">No Post Founds</h2>
      )}
    </section>
  );
};
export default CategoryPosts;
