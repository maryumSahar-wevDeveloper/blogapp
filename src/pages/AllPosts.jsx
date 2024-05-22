import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/auth/config";

function AllPosts() {
  const [post, setPost] = useState([]);
  useEffect(() => {}, []);

  appwriteService.getPost([]).then((posts) => {
    if (posts) {
      setPost(posts.documents);
    }
  });

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            <div key={post.$id}>
              <PostCard />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
