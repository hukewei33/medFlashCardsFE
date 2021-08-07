import React from "react";
import { shallow, mount } from "enzyme";
//import Account from "./Account";
import App from "./App.jsx";
import toJson from "enzyme-to-json";

it("renders without crashing", () => {
  shallow(<App />);
});