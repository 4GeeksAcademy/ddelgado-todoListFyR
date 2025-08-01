import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

import { TodoList } from "./TodoList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoList />
  </StrictMode>,
);
