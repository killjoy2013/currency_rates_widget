import React, { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "font-awesome/css/font-awesome.min.css";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  const MyCustomInput = (
    props: React.HTMLProps<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div>
        <style>
          {`
          .date-picker input {          
            border-radius: var(--border-radius-big);
            height: 3.4rem;
            padding-left: 1rem;
            padding-right: 2rem;
            font-size: 1.2rem;            
            border: solid 1px var(--grey-color);
            width: 12rem;
        }

        .container {           
            position: relative;           
        }

        .icon {
            position: absolute;
            top: 10px;
            left: 95px;
        }
      `}
        </style>
        <div className="container">
          <input type="text" {...props} />
          <AiOutlineCalendar className="icon" />
        </div>
      </div>
    );
  };

  return (
    <DatePicker
      wrapperClassName="date-picker"
      customInput={React.createElement(React.forwardRef(MyCustomInput))}
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
    />
  );
};

export default MyDatePicker;
