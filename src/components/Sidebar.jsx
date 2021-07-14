import { NavLink } from "react-router-dom"
import "../styles/sidebar.scss"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/" exact>
          GIF-Евгений
        </NavLink>
      </div>
      <NavLink to="/create-text" className="sidebar-create-button">
        <i className="icon-plus"></i> Создать GIF-текст
      </NavLink>
      <ul className="sidebar-list">
        <li>
          <NavLink to="/trending">
            <i className="icon-popular"></i>Популярные анимации
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">
            <i className="icon-search"></i>Поиск
          </NavLink>
        </li>
        <li>
          <NavLink to="/likes">
            <i className="icon-like"></i>Понравившиеся
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-social">
        <a rel="noreferrer" href="https://github.com/andr-evg" target="_blank">
          <i className="icon-github"></i>
        </a>
        <a rel="noreferrer" href="https://t.me/AndrYev" target="_blank">
          <i className="icon-telegram"></i>
        </a>
      </div>
    </div>
  )
}
