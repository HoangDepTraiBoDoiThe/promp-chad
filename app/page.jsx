import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex flex-col">
      <h1 className="head_text text-center">
        Welcome to Promp Chad
        <br className="max-md:hidden" />
        <span className="text-2xl orange_gradient">AI powered promps</span>
      </h1>
      <p className=" text-center desc">
        Promp Chad is a web app that generates writing prompts.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
