"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleTopdown, setToggleTopdown] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const setupProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } catch (error) {
        console.error(error); // Log any errors that occur during the execution of getProviders()
      }
    };
    setupProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2">
        <Image
          className="flex flex-col items-center"
          src={"/assets/images/logo.svg"}
          width={30}
          height={30}
          alt="Promp Chad Logo"
        />
        <p className="logo_text">Promp Chad</p>
      </Link>

      {/* Moblie navigation*/}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className=" black_btn">
              Create promp
            </Link>

            <button onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                className="rounded-full"
                src={session?.user?.image}
                loader={() => session?.user?.image}
                width={37}
                height={37}
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {console.log(providers)}
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    className="outline_btn"
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>

      <div className=" sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              className="flex flex-col items-center"
              src={session?.user?.image}
              loader={() => session?.user?.image}
              width={30}
              height={30}
              alt="Promp Chad Logo"
              onClick={() => setToggleTopdown((prev) => !prev)}
            />

            {toggleTopdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleTopdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleTopdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    signOut();
                    setToggleTopdown(false);
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    className="outline_btn"
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
