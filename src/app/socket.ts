"use client";
import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:9000";
export const useSocket = () => {
  return io(URL, {
    autoConnect: false,
  });
};
