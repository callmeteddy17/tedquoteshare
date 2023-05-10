'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-5">
      <Link href={'/'} className="gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={30}
          height={30}
        />
        <p className="logo_text ">TedQuote</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={'/create-quote'} className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              SignOut
            </button>
            <Link href={'/profile'}>
              <Image
                src={session?.user.image}
                height={30}
                width={30}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers
              ? Object.values(providers).map((provider, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => signIn(provider.id)}
                    className="black_btn">
                    Sign In
                  </button>
                ))
              : null}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative ">
        {session?.user ? (
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#03f6cc"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setToggle((prev) => !prev)}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            {toggle ? (
              <div className="dropdown">
                <Link
                  href={'/profile'}
                  className="dropdown_link flex-center gap-3 m-3 "
                  onClick={() => setToggle(false)}>
                  <Image
                    src={session?.user.image}
                    height={30}
                    width={30}
                    className="rounded-full "
                    alt="profile"
                  />
                  My Profile
                </Link>

                <Link
                  href={'/create-quote'}
                  className="dropdown_link"
                  onClick={() => setToggle(false)}>
                  Create Quotes
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggle(false);
                    signOut;
                  }}>
                  Sign Out
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {providers
              ? Object.values(providers).map((provider, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => signIn(provider.id)}
                    className="black_btn">
                    Sign In
                  </button>
                ))
              : null}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
