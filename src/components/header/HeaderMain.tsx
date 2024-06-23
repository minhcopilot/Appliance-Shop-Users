"use client";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/app/AppProvider";
import ButtonLogout from "@/components/ui/button-logout";
import CartButton from "../cart/CartButton";
import { axiosClient } from "@/lib/axiosClient";
import { useRouter } from "next/navigation";

export default function HeaderMain() {
  const { user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axiosClient.get(
        `/products/suggestions?keyword=${query}`
      );
      const data = response.data;
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
  };

  const handleSearch = () => {
    router.push(`/search?q=${searchTerm}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    router.push(`/search?q=${suggestion}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="py-4 border-b border-border">
      <div className="container flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="text-3xl font-bold text-blackish">
            <Image src="/logo.svg" width={200} height={200} alt="logo" />
          </Link>
          <div className="flex items-center md:hidden">
            <CartButton />
            <div className="relative group mx-2 hoverButton">
              {user ? (
                <div className="flex items-center cursor-pointer">
                  {/* <div className="text-[8px] sm:text-[14px] md:text-[15px] lg:text-[16px] mr-2">
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                  </div> */}
                  <BiUser className="text-[24px]" />
                </div>
              ) : (
                <div className="flex items-center cursor-pointer">
                  {/* <span className="text-[16px] mr-2">Tài khoản </span> */}
                  <BiUser className="text-[24px]" />
                </div>
              )}
              <div className="absolute z-50 p-2 top-full -right-4 w-36 showOnHover">
                <div className="p-2 bg-white mt-1 rounded-md shadow-md">
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        className="block px-1 sm:px-2 py-1 sm:py-2 mb-1 text-[10px] sm:text-sm text-center text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                      >
                        Tài khoản
                      </Link>
                      <ButtonLogout />
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-1 sm:px-2 py-1 sm:py-2 mb-1 text-[10px] sm:text-sm text-center text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        href="/register"
                        className="block px-1 sm:px-2 py-1 sm:py-2 text-[10px] sm:text-sm text-center text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Đăng ký
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              className="p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        <div
          className={`w-full md:w-1/2 lg:w-[40%] mt-4 md:mt-0 ${
            isMobileMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="relative">
            <input
              placeholder="Nhập tên sản phẩm"
              type="text"
              className="w-full p-2 px-4 border border-gray-200 rounded-lg"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => fetchSuggestions(searchTerm)}
            />
            <button
              type="button"
              className="absolute top-0 right-0 p-3 text-yellow-400 rounded-e-lg hover:bg-yellow-300 hover:text-white"
              onClick={handleSearch}
            >
              <BsSearch size={17} />
            </button>
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div
          className={`hidden md:flex items-center gap-4 text-accent-foreground text-[24px]`}
        >
          <CartButton />
          <ModeToggle />
          <div className="relative group block hoverButton">
            {user ? (
              <div className="flex items-center cursor-pointer">
                <div className="text-[16px] mr-2">{`${user.firstName} ${user.lastName}`}</div>
                <BiUser className="text-[24px]" />
              </div>
            ) : (
              <div className="flex items-center cursor-pointer">
                <span className="text-[16px] mr-2">Tài khoản </span>
                <BiUser className="text-[24px]" />
              </div>
            )}
            <div className="absolute z-50 p-2 top-full -right-4 w-36 showOnHover">
              <div className="p-2 bg-white mt-1 rounded-md shadow-md">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-2 py-2 mb-1 text-sm text-center text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                    >
                      Tài khoản
                    </Link>
                    <ButtonLogout />
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-2 py-2 mb-1 text-sm text-center text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/register"
                      className="block px-2 py-2 text-sm text-center text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
