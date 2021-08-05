import { useState } from "react"
import Autocomplete from "./Autocomplete"
import { GiphyFetch } from "@giphy/js-fetch-api"
import { Search } from "react-feather"

const SearchInput = ({ setGifs, setResultsInfo }) => {
  const [input, setInput] = useState("")
  const [activeClass, setActiveClass] = useState(-1)
  const [select, setSelect] = useState({
    type: "gifs",
    rating: "g",
  })
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [autocompleteArray, setAutocompleteArray] = useState([])

  const getData = async () => {
    const url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${process.env.REACT_APP_API_KEY}&q=${input}`
    let response = await fetch(url)
    let { data: newArray } = await response.json()
    setAutocompleteArray(newArray)
  }

  const inputHandler = (e) => {
    const target = e.target
    const limit = 50

    if (target.value.length <= limit) {
      setInput(target.value)
    }

    if (input.length > 2) {
      getData()
      setShowAutocomplete(true)
    } else {
      setAutocompleteArray([])
      setShowAutocomplete(false)
    }
  }

  const searchHandler = async (e) => {
    e.preventDefault()
    if (input) {
      const gf = new GiphyFetch(process.env.REACT_APP_SDK_KEY)
      const { data: newGifs } = await gf.search(input, {
        sort: "relevant",
        limit: 32,
        type: select.type,
        rating: select.rating,
      })
      if (newGifs.length > 1) {
        setResultsInfo({ results: true, text: input })
      } else {
        setResultsInfo({ results: false, text: input })
      }
      setGifs(newGifs)
      setInput("")
      setShowAutocomplete(false)
    }
  }

  const selectHandler = (e) => {
    switch (e.target.dataset.id) {
      case "rating":
        setSelect((prevSelect) => ({ ...prevSelect, rating: e.target.value }))
        break
      default:
        setSelect((prevSelect) => ({ ...prevSelect, type: e.target.value }))
        break
    }
  }

  const closeAutocomplete = () => {
    setShowAutocomplete(false)
  }

  const activeClassHandler = (activeClass) => {
    setActiveClass(activeClass)
    autocompleteArray.forEach((item, index) => {
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
          <Search />
        </button>

        {showAutocomplete && (
          <Autocomplete
            autocompleteArray={autocompleteArray}
            clickSubmit={searchHandler}
            close={closeAutocomplete}
            activeClass={activeClass}
            setActiveClass={activeClassHandler}
          />
        )}
      </div>
      <label>
        Возрастная категория
        <select
          data-id="rating"
          onChange={selectHandler}
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
          data-id="type"
          onChange={selectHandler}
          value={select.type}
          className="search-panel-select"
        >
          <option value="gifs">Гифки</option>
          <option value="stickers">Стикеры</option>
          <option value="text">Текст</option>
        </select>
      </label>
    </form>
  )
}

export default SearchInput
