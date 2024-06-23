"use client";
import { PhoneCall } from "lucide-react";
import React from "react";

const CallButton: React.FC<any> = () => {
  const handleClick = () => {
    window.location.href = "tel:" + "0905363682";
  };

  return (
    <div className="fixed bottom-20 right-6">
      <button
        onClick={handleClick}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded-full p-2"
      >
        <PhoneCall />
      </button>
    </div>
  );
};

export default CallButton;
