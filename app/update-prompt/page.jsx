"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import React, { useState, useEffect } from "react";

const updatePrompt = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tag: "",
    prompt: "",
  });

  useEffect(() => {
    const getPromptDetail = async () => {
      const promptDetail = await fetch(`/api/prompt/${promptId}`);
      const data = await promptDetail.json();
      setPost({
        tag: data.tag,
        prompt: data.prompt,
      });
    };

    if (promptId) getPromptDetail();
  }, [promptId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("prompt id not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default updatePrompt;
