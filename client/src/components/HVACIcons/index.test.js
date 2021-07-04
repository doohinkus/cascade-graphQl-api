import { render, screen } from "@testing-library/react";
import { Image, Heater, AC, DisplayHVACIcon } from "./index.js";

describe("Image", () => {
  test('Image must have src = "/heater.png" and alt = "Heater"', () => {
    render(<Image src="heater.png" alt="Heater image" />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "heater.png");
    expect(logo).toHaveAttribute("alt", "Heater image");
  });
});
describe("Heater", () => {
  test('Image must have src = "/heater.png" and alt = "Heater"', () => {
    render(<Heater src="heater.png" alt="Heater icon" />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "heater.png");
    expect(logo).toHaveAttribute("alt", "heater icon");
  });
});
describe("AC", () => {
  test('Image must have src = "/heater.png" and alt = "Heater"', () => {
    render(<AC src="ac.png" alt="ac icon" />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "ac.png");
    expect(logo).toHaveAttribute("alt", "ac icon");
  });
});
describe("DisplayHVACIcon", () => {
  test("Displays ac icon when type is ac", () => {
    render(<DisplayHVACIcon HVACType="ac" />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "ac.png");
    expect(logo).toHaveAttribute("alt", "ac icon");
  });
});
