"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user) fetchPrompts();
  }, []);

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    router.push(`/delete-prompt?id=${post._id}`);
  };

  return (
    <div>
      <Profile
        name="My"
        desc="welcome to your profile."
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
