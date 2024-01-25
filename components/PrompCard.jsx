"use client";

import Image from "next/image";
import { useState } from "react";

const PrompCard = ({ post, handleTagClick }) => {
  const [coppy, setCoppy] = useState("");

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image}
            loader={() => post?.creator?.image}
            alt="user_pic"
            width={30}
            height={30}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.name}
            </h3>
            <p className="font-inter text-gray-500 text-sm">
              {post?.creator?.email}
            </p>
          </div>
        </div>
        <div className="coppy_btn" onClick={() => {}}>
          <Image
            src={
              coppy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/coppy.svg"
            }
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post?.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        {post?.tag}
      </p>
    </div>
  );
};

export default PrompCard;
