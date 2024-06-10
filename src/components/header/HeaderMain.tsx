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

  return (
    <div className="py-6 border-b border-border">
      <div className="container items-center justify-between sm:flex">
        <Link
          href="/"
          className="pb-4 text-4xl font-bold text-center sm:pb-0 text-blackish"
        >
          <Image src="/logo.svg" width={200} height={200} alt="logo" />
        </Link>
        <div className="relative w-full sm:w-[300px] md:w-[50%]">
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
        <div className="hidden items-center lg:flex gap-4 text-accent-foreground text-[30px]">
          <div className="relative">
            <div className="inline-block group">
              {user ? (
                <div className="flex">
                  <div className="text-[18px] cursor-pointer mr-2">{`${user.firstName} ${user.lastName}`}</div>
                  <BiUser className="text-[24px] cursor-pointer" />
                </div>
              ) : (
                <div className="flex">
                  <span className="text-[18px] mr-2">Tài khoản </span>
                  <BiUser className="text-[24px] cursor-pointer" />
                </div>
              )}
              <div className="absolute p-2 mt-1 transition-opacity duration-300 bg-white rounded-md shadow-md opacity-0 top-full -right-4 w-36 group-hover:opacity-100">
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

          <div className="relative">
            <CartButton />
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
