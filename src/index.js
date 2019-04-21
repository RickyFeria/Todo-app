import React from "react";
import { render } from "react-dom";
import { configureStore } from "./redux/store";
import Root from "./components/Root";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const store = configureStore();

render(<Root store={store} />, document.getElementById("root"));
