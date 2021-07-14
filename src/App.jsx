import { Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import SearchPage from "./components/SearchPage"
import LikesPage from "./components/LikesPage"
import HomePage from "./components/HomePage"
import TrendingPage from "./components/TrendingPage"
import CreateTextPage from "./components/CreateTextPage"
import "./styles/app.scss"

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/trending">
        <TrendingPage />
      </Route>
      <Route path="/search">
        <SearchPage />
      </Route>
      <Route path="/likes">
        <LikesPage />
      </Route>
      <Route path="/create-text">
        <CreateTextPage />
      </Route>
    </div>
  )
}

export default App
