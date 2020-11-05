import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { buildCalendar, dayStyle, isSelected } from './style.js';
import './calendar.css';

export default function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const [selectDay, setSelectDay] = useState({
    date: '',
    month: '',
    day: '',
    price: 0,
    style: '',
  });

  function currMonth() {
    return value.format('MMMM');
  }
  function currYear() {
    return value.format('YYYY');
  }
  function prevMonth() {
    return value.clone().subtract(1, 'month');
  }
  function nextMonth() {
    return value.clone().add(1, 'month');
  }
  function thisMonth() {
    return value.isSame(new Date(), 'month');
  }

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div className="container">
      <div className="calendar-container">
        <div className="calendar">
          {/*  Header */}
          <div className="header">
            <div
              onClick={() => !thisMonth() && setValue(prevMonth())}
              className="change-month-pointer"
            >
              {!thisMonth() ? <span>&#9668;</span> : null}
            </div>
            <div>
              {currMonth().slice(0, 3)} {currYear()}
            </div>
            <div
              onClick={() => setValue(nextMonth())}
              className="change-month-pointer"
            >
              &#9654;
            </div>
          </div>
          <div className="body">
            {/*  Day name*/}
            <div className="day-names">
              {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((d) => (
                <div key={d} className="week">
                  {d}
                </div>
              ))}
            </div>
            {/*  Days container  */}
            {calendar.map((week, index) => (
              <div key={index} className="day-container">
                {week.map((day, index) => (
                  <div
                    key={index}
                    className="day"
                    onClick={() =>
                      dayStyle(day, index).style !== 'before' &&
                      setSelectDay({
                        date: day,
                        month: day.format('MMMM'),
                        day: day.format('D'),
                        price: dayStyle(day, index).price,
                        style: dayStyle(day, index).style,
                      })
                    }
                  >
                    <div
                      className={`${dayStyle(day, index).style} ${isSelected(
                        selectDay.date,
                        day
                      )}`}
                    >
                      {day.format('D').toString()}
                      {dayStyle(day, index).price && (
                        <div>{'$' + dayStyle(day, index).price}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Delivery date  */}
        <div className="deliver-info-container">
          <h3>DELIVERY DATE</h3>
          <p>
            Select the day you wish to receive your order. Our products ship
            frozen- please make sure you plan ahead and save time for thawing
          </p>
          <div className="shep-type">
            <div>
              <span className="shep-type-span standard"></span>Standard - $9.99
            </div>
            <div>
              <span className="shep-type-span overnight"></span>Overnight -
              $79.99
            </div>
            <div>
              <span className="shep-type-span saturday"></span>Saturday - $9.99
            </div>
          </div>
        </div>
      </div>
      {/* Day select info */}
      {selectDay.price > 0 && (
        <div className="user-choice">
          <span className={`shep-type-span ${selectDay.style}`}></span>You have
          selected {selectDay.style} Shipping - ${selectDay.price}. Your package
          will arrive on{' '}
          <span className="user-choice-date">
            {selectDay.month} {selectDay.day}
          </span>
        </div>
      )}
    </div>
  );
}
