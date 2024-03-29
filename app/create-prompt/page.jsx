"use client";

import { useRouter } from "next/navigation";
import Form from "@components/Form";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const createPrompt = () => {
  const route = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({
    tag: "",
    prompt: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const createSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        route.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createSubmit}
    />
  );
};

export default createPrompt;
