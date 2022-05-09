import { screen, render } from "@testing-library/react";
import CustomDatePicker from "@src/elements/CustomDatePicker";
import { useState } from "react";

const TestComponent = () => {
  const [testDate, setTestDate] = useState<Date>(new Date());

  return (
    <CustomDatePicker
      label="test date"
      name="testDate"
      value={testDate}
      onChange={(newDate) => setTestDate(newDate.value)}
    ></CustomDatePicker>
  );
};

describe("Custom Date Picker tests", () => {
  it("Renders initially", () => {
    render(<TestComponent />);

    const datePicker = screen.getByText("test date");

    expect(datePicker).toHaveTextContent("test date");
  });
});
