import React from "react";
import { BsSearch } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/app/AppProvider";
import ButtonLogout from "@/components/ui/button-logout";

export default function HeaderMain() {
  const { user } = useAppContext();

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="container sm:flex justify-between items-center">
        <Link
          href="/"
          className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish"
        >
          <Image src="/logo.svg" width={200} height={200} alt="logo" />
        </Link>
        <div className="w-full sm:w-[300px] md:w-[50%] relative">
          <input
            placeholder="Nhập tên sản phẩm"
            type="text"
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
          />
          <BsSearch
            size={20}
            className="absolute right-0 top-0 mr-3 mt-3 text-gray-400"
          />
        </div>
        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
          <div className="relative">
            <div className="group inline-block">
              {user ? (
                <div className="flex">
                  <div className="text-[20px] cursor-pointer mr-2">{`${user.firstName} ${user.lastName}`}</div>
                  <BiUser className="text-gray-500 text-[24px] cursor-pointer" />
                </div>
              ) : (
                <div className="flex">
                  <span className="text-[20px] mr-2">Tài khoản </span>
                  <BiUser className="text-gray-500 text-[24px] cursor-pointer" />
                </div>
              )}
              <div className="absolute top-full -right-4 mt-1 bg-white shadow-md rounded-md p-2 w-36 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="block bg-yellow-500 text-white rounded-md py-2 px-2 mb-1 text-sm text-center hover:bg-yellow-600"
                    >
                      Tài khoản
                    </Link>
                    <ButtonLogout />
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block bg-yellow-500 text-white rounded-md py-2 px-2 mb-1 text-sm text-center hover:bg-yellow-600"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/register"
                      className="block bg-gray-200 text-gray-700 rounded-md py-2 px-2 text-sm text-center hover:bg-gray-300"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="relative">
            <FiHeart />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div>
          </div>
          <div className="relative">
            <HiOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
