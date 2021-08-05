import { useState } from "react"
import { NavLink } from "react-router-dom"
import { AnimatedMobileMenu, AnimateUnmounting } from "./animation"
import { Star, Plus, Search, Send, Smile, GitHub, X, Menu } from "react-feather"
import "../styles/sidebar.scss"

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Logo />
      <MenuList />
    </div>
  )
}
const Logo = () => {
  return (
    <div className="sidebar-logo">
      <NavLink to="/" exact>
        GIF-Евгений
      </NavLink>
    </div>
  )
}
const MenuList = () => {
  return (
    <>
      <NavLink to="/create-text" className="sidebar-create-button">
        <Plus /> Создать GIF-текст
      </NavLink>
      <ul className="sidebar-list">
        <li>
          <NavLink to="/trending">
            <Star /> Популярные анимации
          </NavLink>
        </li>
        <li>
          <NavLink to="/emoji">
            <Smile /> Эмодзи
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">
            <Search /> Поиск
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-social">
        <a rel="noreferrer" href="https://github.com/zhmeka" target="_blank">
          <GitHub />
        </a>
        <a rel="noreferrer" href="https://t.me/AndrYev" target="_blank">
          <Send />
        </a>
      </div>
    </>
  )
}

export const SidebarMobile = () => {
  const [isActiveMobileMenu, setActiveMobileMenu] = useState(false)

  const activeMobileMenuHandler = () => {
    setActiveMobileMenu(false)
  }

  return (
    <div className="sidebar-mobile">
      <Logo />
      <button onClick={() => setActiveMobileMenu((bool) => !bool)}>
        {isActiveMobileMenu ? <X /> : <Menu />}
      </button>
      <AnimateUnmounting>
        {isActiveMobileMenu && <MobileMenu close={activeMobileMenuHandler} />}
      </AnimateUnmounting>
    </div>
  )
}

const MobileMenu = ({ close }) => {
  const onClickHandler = (e) => {
    if (e.target.nodeName === "A") {
      close()
    }
  }
  return (
    <AnimatedMobileMenu className="mobile-menu" onClickHandler={onClickHandler}>
      <MenuList />
      <div className="mobile-menu-shadow"></div>
    </AnimatedMobileMenu>
  )
}
