import { useState } from "react"
import { GiphyFetch } from "@giphy/js-fetch-api"
import GifItem from "./GifItem"
import Loader from "./Loader"
import "../styles/create-text-anim.scss"

export default function CreateTextPage() {
  const [gifs, setGifs] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const setGifsHandler = (array) => {
    setGifs(array)
  }
  const loadingHandler = (bool) => {
    setLoading(bool)
  }

  return (
    <div className="container">
      <CreateTextForm getGifs={setGifsHandler} setLoading={loadingHandler} />
      <div className="gif-grid">
        {isLoading ? <Loader /> : null}
        {gifs
          ? gifs.map((item, i) => {
              return (
                <GifItem
                  key={i}
                  urlGIF={item.images.original.webp}
                  urlPrev={item.images.fixed_width_downsampled.webp}
                  alt={item.title}
                />
              )
            })
          : null}
      </div>
    </div>
  )
}

function CreateTextForm({ getGifs, setLoading }) {
  const [text, setText] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    if (text) {
      getGifs(null)
      setLoading(true)
      const gf = new GiphyFetch("xYgJNGRcmb1vMOflhwyjjiv0SpwJ0mfR")
      const { data: gifs } = await gf.animate(text, { limit: 16 })
      setLoading(false)
      getGifs(gifs)
    }
  }

  const textHandler = (e) => {
    if (
      !e.target.value.match(/[^A-Za-z0-9_ ]/) &&
      e.target.value.length <= 100
    ) {
      setText(e.target.value)
    }
  }

  return (
    <form onSubmit={submit} className="create-text">
      <div className="create-text-wrap">
        <input
          placeholder="Поддерживаются только латинские буквы и цифры"
          type="text"
          onChange={textHandler}
          value={text}
        />
        {text ? <button type="submit">Создать</button> : null}
      </div>
    </form>
  )
}
