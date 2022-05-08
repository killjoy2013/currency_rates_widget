import { add, multiply, subtract } from "./calculator";

describe("math tests", () => {
  it("Adds two numbers", async () => {
    expect(add(5, 5)).toStrictEqual(10);
  });
  it("Subtracts second number from first one", async () => {
    expect(subtract(6, 5)).toStrictEqual(1);
  });
});
