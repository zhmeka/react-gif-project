import { useState, useEffect } from "react"
import { GiphyFetch } from "@giphy/js-fetch-api"
import GifItem from "./GifItem"
import "../styles/search.scss"

export default function SearchPage() {
  const [gifs, setGifs] = useState([])

  const getGifsHandler = (items) => {
    setGifs(items)
  }

  return (
    <div className="container">
      <SearchInput setGifs={getGifsHandler} />
      <div className="gif-grid">
        {gifs.length
          ? gifs.map((item, i) => {
              return (
                <GifItem
                  key={i}
                  urlGIF={item.images.original.webp}
                  urlPrev={item.images.downsized_still.url}
                  // urlPrev={item.images.preview_webp.url}
                  alt={item.title}
                />
              )
            })
          : null}
      </div>
    </div>
  )
}

function SearchInput({ setGifs }) {
  const [input, setInput] = useState("")
  const [activeClass, setActiveClass] = useState(-1)
  const [select, setSelect] = useState({
    type: "gifs",
    rating: "g",
  })
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [arr, setArr] = useState([])

  function getData() {
    const url = `https://api.giphy.com/v1/gifs/search/tags?api_key=6malM8NxJWH8BdmbgOnp6rN6ybXuVXGI&q=${input}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArr(data.data)
      })
  }

  const inputHandler = (e) => {
    const target = e.target

    setInput(target.value)
    if (input.length > 2) {
      getData()
      setShowAutocomplete(true)
    } else {
      setArr([])
      setShowAutocomplete(false)
    }
  }

  const searchHandler = async (e) => {
    e.preventDefault()
    const gf = new GiphyFetch("xYgJNGRcmb1vMOflhwyjjiv0SpwJ0mfR")
    const { data: gifs } = await gf.search(input, {
      sort: "relevant",
      lang: "en",
      limit: 32,
      type: select.type,
      rating: select.rating,
    })
    setGifs(gifs)
    setInput("")
    setShowAutocomplete(false)
  }

  const ratingHandler = (e) => {
    setSelect({ rating: e.target.value })
  }

  const typeHandler = (e) => {
    setSelect({ type: e.target.value })
  }

  const closeAutocomplete = () => {
    setShowAutocomplete(false)
  }

  const activeClassHandler = (activeClass) => {
    setActiveClass(activeClass)
    arr.forEach((item, index) => {
      if (activeClass === index) {
        setInput(item.name)
      }
    })
  }

  return (
    <form className="search-panel" onSubmit={searchHandler}>
      <div>
        <input
          className="search-panel-input"
          type="text"
          placeholder="Поиск..."
          onChange={inputHandler}
          value={input}
        />
        <button className="search-panel-button" type="submit">
          <i className="icon-search"></i>
        </button>
      </div>
      <label>
        Возрастная категория
        <select
          onChange={ratingHandler}
          value={select.rating}
          className="search-panel-select"
        >
          <option value="g">G</option>
          <option value="pg">PG</option>
          <option value="pg-13">PG-13</option>
          <option value="r">R</option>
        </select>
      </label>
      <label>
        Тип
        <select
          onChange={typeHandler}
          value={select.type}
          className="search-panel-select"
        >
          <option value="gifs">Гифки</option>
          <option value="stickers">Стикеры</option>
          <option value="text">Текст</option>
        </select>
      </label>
      {showAutocomplete ? (
        <Autocomplete
          autocompleteArray={arr}
          clickSubmit={searchHandler}
          close={closeAutocomplete}
          activeClass={activeClass}
          setActiveClass={activeClassHandler}
        />
      ) : null}
    </form>
  )
}

function Autocomplete({
  autocompleteArray,
  close,
  clickSubmit,
  activeClass,
  setActiveClass,
}) {
  useEffect(() => {
    const keyUpDownHanlder = (e) => {
      if (e.key === "ArowDown" || e.key === "ArrowUp") {
        e.preventDefault()
      }
      if (e.key === "ArrowDown") {
        activeClass > autocompleteArray.length - 2
          ? setActiveClass(0)
          : setActiveClass(activeClass + 1)
      }
      if (e.key === "ArrowUp") {
        activeClass <= 0
          ? setActiveClass(autocompleteArray.length - 1)
          : setActiveClass(activeClass - 1)
      }
    }
    window.addEventListener("keydown", keyUpDownHanlder)
    return () => {
      window.removeEventListener("keydown", keyUpDownHanlder)
    }
  }, [activeClass, setActiveClass, autocompleteArray])

  const mouseHanlder = (e) => {
    setActiveClass(+e.target.dataset.id)
  }

  return (
    <>
      <div className="autocomplete" onMouseMove={mouseHanlder}>
        <ul>
          {autocompleteArray.map((item, index) => {
            return (
              <li
                className={activeClass === index ? "active" : null}
                key={index}
                onClick={clickSubmit}
                data-id={index.toString()}
              >
                {item.name}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="autocomplete-container" onClick={close}></div>
    </>
  )
}
