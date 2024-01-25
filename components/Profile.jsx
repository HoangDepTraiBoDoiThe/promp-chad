"use client";

import PrompCard from "./PrompCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-ful">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} profile</span>
      </h1>
      <p className="desc text_left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data?.map((post) => (
          <PrompCard
            key={post._id}
            post={post}
            handEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => {
              handleDelete && handleDelete(post);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
