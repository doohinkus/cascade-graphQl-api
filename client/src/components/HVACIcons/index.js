import heater from "./heater.png";
import ac from "./ac.png";
import "./HVACIcons.css";
import { Fragment } from "react";

export function Image({ alt, src }) {
  return (
    <>
      <img src={src} alt={alt} data-testid={alt} className="center small" />
    </>
  );
}

export function Heater() {
  return (
    <div>
      <Image src={heater} alt="heater icon" />
    </div>
  );
}
export function AC() {
  return (
    <div>
      <Image src={ac} alt="ac icon" />
    </div>
  );
}
