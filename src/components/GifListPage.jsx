import { useEffect, useState } from "react"
import { GiphyFetch } from "@giphy/js-fetch-api"
import GifItem from "./GifItem"
import Loader from "./Loader"

const GifListPage = ({ type }) => {
  const [offset, setOffset] = useState(0)
  const [endingData, setEndingData] = useState(false)
  const [gifs, setGifs] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    let cleanupFunction = false

    async function getData() {
      setLoading(true)
      const gf = new GiphyFetch(process.env.REACT_APP_SDK_KEY)
      let gifs = []
      switch (type) {
        case "emoji":
          gifs = await gf.emoji({ limit: 16, offset })
          break
        default:
          gifs = await gf.trending({ limit: 16, offset })
          break
      }
      if (!cleanupFunction) {
        gifs.data.length !== 0
          ? setGifs((prevGifs) => [...prevGifs, ...gifs.data])
          : setEndingData(true)
        setLoading(false)
      }
    }
    getData()
    return () => (cleanupFunction = true)
  }, [offset, type])

  const onScrollHandler = (e) => {
    const target = e.target
    const stepOffset = 16

    if (target.scrollTop + target.clientHeight === target.scrollHeight) {
      setOffset((prevOffset) => prevOffset + stepOffset)
    }
  }

  return (
    <div className="container" onScroll={!endingData ? onScrollHandler : null}>
      <div className="gif-grid">
        {gifs.length > 0 &&
          gifs.map((item, i) => {
            return (
              <GifItem
                key={i}
                urlGIF={item.images.original.webp}
                urlPrev={item.images.downsized_still.url}
                title={item.title}
                item={item}
              />
            )
          })}
      </div>
      {isLoading && <Loader />}
    </div>
  )
}

export default GifListPage
