"use client";
import React, { useState } from "react";

function parseBirthday(birthday: any) {
  if (
    !birthday ||
    birthday === "undefined" ||
    birthday === null ||
    birthday === ""
  ) {
    return { day: 1, month: 1, year: 1990 };
  }

  const [year, month, day] = birthday.split("-");
  return { day: parseInt(day), month: parseInt(month), year: parseInt(year) };
}
export default function BirthDateInputs({
  birthday,
  onDateChange,
}: {
  birthday?: any;
  onDateChange: (day: number, month: number, year: number) => void;
}) {
  const { day, month, year } = parseBirthday(birthday);
  const [selectedDay, setSelectedDay] = useState(day);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = parseInt(e.target.value);
    setSelectedDay(day);
    onDateChange(day, selectedMonth, selectedYear);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    onDateChange(selectedDay, month, selectedYear);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    onDateChange(selectedDay, selectedMonth, year);
  };
  const generateOptions = (start: any, end: any) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const daysInMonth = (month: any, year: any) =>
    new Date(year, month, 0).getDate();
  return (
    <div className="flex items-center gap-16">
      <div className="border ">
        <select
          id="day"
          value={selectedDay}
          onChange={handleDayChange}
          className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {generateOptions(1, daysInMonth(selectedMonth, selectedYear))}
        </select>
      </div>
      <div className="border ">
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {generateOptions(1, 12)}
        </select>
      </div>
      <div className="border ">
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {generateOptions(1900, 2024)}
        </select>
      </div>
    </div>
  );
}
