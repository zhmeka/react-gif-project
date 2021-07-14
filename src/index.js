import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./styles/index.scss"
import App from "./App.jsx"

const application = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(application, document.getElementById("root"))
