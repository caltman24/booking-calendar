import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import Calendar, { TileArgs } from "react-calendar";

export const meta: MetaFunction = () => {
  return [
    { title: "Booking System Demo" },
    { name: "description", content: "a booking system demo" },
  ];
};

export default function Index() {
  const [dateList, setDateList] = useState<Date[]>([]);

  const handleDayClick = (value: Date, event: React.MouseEvent<HTMLButtonElement>) => {
    if (dateList.length !== 0) {
      setDateList([])
      return;
    }

    const dates = getThreeWeeksDates(value);
    console.log(dates)

    setDateList(dates);
  };

  const handleTileClassName = ({ date, view }: TileArgs) => {
    if (view === "month") {
      for (const d of dateList) {
        if (d.toDateString() === date.toDateString()) {
          return "active"
        }
      }
    }
  }

  return (
    <div className="grid place-items-center">
      <div className="max-w-[525px]">
        <Calendar
          onClickDay={handleDayClick}
          tileClassName={handleTileClassName}
        />
      </div>
    </div>
  );
}

function getThreeWeeksDates(startDate: Date): Date[] {
  const dates = [];
  const date = new Date(startDate);

  for (let i = 0; i < 22; i++) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
