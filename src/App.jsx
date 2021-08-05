import { Route, Switch } from "react-router-dom"
import { Sidebar, SidebarMobile } from "./components/Sidebar"
import SearchPage from "./components/searchPage/SearchPage"
import GifListPage from "./components/GifListPage"
import HomePage from "./components/HomePage"
import CreateTextPage from "./components/createTextPage/CreateTextPage"
import Error404Page from "./components/Error404Page"
import { useMediaQuery } from "./hooks/useMediaQuery"
import "./styles/app.scss"

const App = () => {
  let isLargeDisplay = useMediaQuery("(min-width: 769px)")
  let isSmallDisplay = useMediaQuery("(max-width: 768px)")
  return (
    <div className="App">
      {isSmallDisplay && <SidebarMobile />}
      {isLargeDisplay && <Sidebar />}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/create-text" exact component={CreateTextPage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/trending" exact>
          <GifListPage key="trending" type="trending" />
        </Route>
        <Route path="/emoji" exact>
          <GifListPage key="emoji" type="emoji" />
        </Route>
        <Route component={Error404Page} />
      </Switch>
    </div>
  )
}

export default App
