"use client";

import React from "react";
import Timekeeper from "react-timekeeper";

type Props = {
  name: string;
  id?: string;
  defaultValue?: string; // HH:mm
};

export default function TimeSelect({ name, id, defaultValue }: Props) {
  const [value, setValue] = React.useState(defaultValue ?? "12:00");

  return (
    <div className="relative">
      <input type="hidden" id={id} name={name} value={value} readOnly />
      <div className="rounded-md border mx-auto flex justify-center">
        <Timekeeper
          time={value}
          onChange={(data: any) => setValue(data.formatted24)}
          hour24Mode
          switchToMinuteOnHourSelect
        />
      </div>
    </div>
  );
}
