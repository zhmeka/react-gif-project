import { useState } from "react"
import CreateTextForm from "./CreateTextForm"
import GifItem from "../GifItem"
import Loader from "../Loader"
import "../../styles/create-text.scss"

const CreateTextPage = () => {
  const [gifs, setGifs] = useState([])
  const [isLoading, setLoading] = useState(false)

  const setGifsHandler = (array) => {
    setGifs(array)
  }
  const loadingHandler = (bool) => {
    setLoading(bool)
  }

  return (
    <div className="container">
      <CreateTextForm setGifs={setGifsHandler} setLoading={loadingHandler} />
      <div className="gif-grid">
        {isLoading && <Loader />}
        {gifs.length > 0 &&
          gifs.map((item, i) => {
            return (
              <GifItem
                key={i}
                urlGIF={item.images.original.webp}
                urlPrev={item.images.fixed_width_downsampled.webp}
                title={item.title}
              />
            )
          })}
      </div>
    </div>
  )
}

export default CreateTextPage
