"use client";
import { useAppContext } from "@/app/AppProvider";
import { axiosClient } from "@/lib/axiosClient";
import React, { useState, useEffect } from "react";

export default function Profile() {
  const { sessionToken } = useAppContext();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchRequest = async () => {
      const result: any = await axiosClient.get("/customers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      setCustomers(result.data.payload.data.customer);
    };
    fetchRequest();
  }, [sessionToken]);

  return (
    <div>
      {customers.map((customer: any, index) => (
        <p key={index}>Last Name: {customer.lastName}</p>
      ))}
    </div>
  );
}
