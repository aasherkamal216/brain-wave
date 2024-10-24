"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { } from 'next-auth/react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
         <Image
         src="/assets/images/brainwave.svg"
         alt="BrainWave Logo"
         width={40}
         height={40}
         className="object-contain"
         />
         <p className="logo_text">BrainWave</p>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt"
              className="black_btn">
              Create Prompt
              </Link>
              <button type="button" onClick={signOut}
              className="outline_btn">
                Sign Out
              </button>

              <Link href="/profile">
                <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                />
              </Link>
            </div>
          ): (
            <>
              {providers && 
              Object.values(providers).map((provider) => (
                <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
                >
                  Sign In
                </button>
              ))}
            </>
          )
        }
        </div>
        
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className="dropdown drop-shadow-xl">
                  <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                  >
                    <b>My Profile</b>
                  </Link>

                  <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  <b>Create Prompt</b>
                  </Link>

                  <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                    >
                    Sign Out
                    </button>
                </div>
              )}
            </div>
          ): (
            <>
              {providers && 
              Object.values(providers).map((provider) => (
                <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
                >
                  Sign In
                </button>
              ))}
            </>
          )}
        </div>
    </nav>
  )
}

export default Nav