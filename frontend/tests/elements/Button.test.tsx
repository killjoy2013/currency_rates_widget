import { screen, render } from "@testing-library/react";
import Button from "@src/elements/Button";

describe("Button tests", () => {
  it("renders initially", () => {
    render(
      <Button
        label="init label"
        variant="filled"
        onClick={() => {
          console.log("initial onclick");
        }}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("init label");
  });
});
