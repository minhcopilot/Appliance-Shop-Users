import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_baseURL}`,
  headers: { "Content-Type": "application/json" },
});


const axiosServerNext = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL_SERVER_NEXT}`,
  headers: { "Content-Type": "application/json" },
});

export { axiosClient, axiosServerNext };
