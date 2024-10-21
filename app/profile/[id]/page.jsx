"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile! Discover ${userName}'s amazing prompts and get inspired by their creativity.`}
      data={userPosts}
      handleGoHome={handleGoHome} 
    />
  );
};

export default UserProfile;
