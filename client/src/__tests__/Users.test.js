import React from "react";
import ReactDOM from "react-dom";
import App from "../components/Users/Pages/User";
import renderer from "react-test-renderer";

test("Users component renders", () => {
  const component = renderer.create(<button>Poop</button>);
});
