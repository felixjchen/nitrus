import React from "react";
import { render } from "react-dom";
import Page from "./lib/react-component-page";

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

render(<Page />, document.getElementById("root"));
