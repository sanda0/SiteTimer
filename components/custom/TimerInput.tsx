import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface TimerInputProps {
  onTimeChange: (totalMinutes: number) => void;
  time:number;
}

const TimerInput: React.FC<TimerInputProps> = ({ onTimeChange,time }) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [error, setError] = useState("");

  const validateInput = (value: string, type: "hours" | "minutes") => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0 || (type === "hours" && num > 23) || (type === "minutes" && num > 59)) {
      setError(`Invalid ${type}`);
    } else {
      setError("");
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHours(value);
    validateInput(value, "hours");
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinutes(value);
    validateInput(value, "minutes");
  };

  useEffect(() => {
    if (!error) {
      const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
      onTimeChange(totalMinutes);
    }
  }, [hours, minutes, error, onTimeChange]);

  useEffect(() => {
    const totalHours = Math.floor(time / 60);
    const totalMinutes = time % 60;
    setHours(totalHours.toString().padStart(2, "0"));
    setMinutes(totalMinutes.toString().padStart(2, "0"));
  }, [time]);

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <div className="grid gap-1 text-center">
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
          <Input
            id="hours"
            type="text"
            className="w-12"
            value={hours}
            onChange={handleHoursChange}
          />
        </div>
        <div className="grid gap-1 pt-3 text-4xl text-center">:</div>
        <div className="grid gap-1 text-center">
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
          <Input
            id="minutes"
            type="text"
            className="w-12"
            value={minutes}
            onChange={handleMinutesChange}
          />
        </div>
      </div>
      {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
    </div>
  );
};

export default TimerInput;