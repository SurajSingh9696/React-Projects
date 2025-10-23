import React, { useEffect, useState } from 'react';
import "./DateAndTime.css";

function DateAndTime() {
  const [dateTime, setDateTime] = useState({ date: '', time: '' });

  const updateDateTime = () => {
    const now = new Date();
    setDateTime({
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString()
    });
  };
  
  useEffect(() => {
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="date-time">
      {dateTime.date} • {dateTime.time}
    </div>
  );
}

export default DateAndTime;