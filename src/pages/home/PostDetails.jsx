import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import postService from '../../apis/postService';
import Post from '../../components/Post';
import CustomLoading from '../../components/CustomLoading';
import Navbar from '../../components/Navbar';

function PostDetail() {
  // Use useParams to get the 'id' parameter from the URL
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [post, setPost] = useState({});

  useEffect(() => {
    // Inside the useEffect, set loading to true initially
    setLoading(true);

    postService.getPost(id).then((res) => {
      setPost(res.data.data);
      setLoading(false); // Set loading to false once data is fetched
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <CustomLoading />
      ) : (
        <>
          <Navbar /> <Post post={post} setPostFromPostDetail={setPost} />
        </>
      )}
    </>
  );
}

export default PostDetail;
