import { expect, test, describe } from "vitest";
import { keepNDecimalPlaces } from "@/math";

describe("keepNDecimalPlaces", () => {
  test("keepNDecimalPlaces should pad zeros when decimals are insufficient", () => {
    expect(keepNDecimalPlaces(1.2, 2)).toBe("1.20");
    expect(keepNDecimalPlaces(10, 3)).toBe("10.000");
  });

  test("keepNDecimalPlaces should round when decimals exceed n", () => {
    expect(keepNDecimalPlaces(1.236, 2)).toBe("1.24");
    expect(keepNDecimalPlaces(1.234, 2)).toBe("1.23");
  });

  test("keepNDecimalPlaces should support zero decimal places", () => {
    expect(keepNDecimalPlaces(1.6, 0)).toBe("2");
    expect(keepNDecimalPlaces(1.4, 0)).toBe("1");
  });

  test("keepNDecimalPlaces should support numeric strings", () => {
    expect(keepNDecimalPlaces("5.", 1)).toBe("5.0");
    expect(keepNDecimalPlaces(".5", 1)).toBe("0.5");
    expect(keepNDecimalPlaces("1.2.3", 1)).toBe("1.2");
    expect(keepNDecimalPlaces("1.......3", 1)).toBe("1.0");
    expect(keepNDecimalPlaces(".2.3", 1)).toBe("0.2");
  });
});
