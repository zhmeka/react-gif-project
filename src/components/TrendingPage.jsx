import { useEffect, useState } from "react"
import GifItem from "./GifItem"
import Loader from "./Loader"

export default function TrendingPage() {
  const [trendingGifs, setTrendingGifs] = useState([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    function getData() {
      const url = `https://api.giphy.com/v1/gifs/trending?api_key=6malM8NxJWH8BdmbgOnp6rN6ybXuVXGI&limit=16&offset=${offset}&rating=pg-13`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false)
          setTrendingGifs((prevData) => [...prevData, ...data.data])
        })
    }
    getData()
  }, [offset])

  const scrollHandle = (e) => {
    const target = e.target
    if (target.scrollTop + target.clientHeight === target.scrollHeight) {
      setOffset((prevOffset) => prevOffset + 16)
    }
  }

  return (
    <div className="container" onScroll={scrollHandle}>
      <div className="gif-grid">
        {trendingGifs
          ? trendingGifs.map((item, i) => {
              return (
                <GifItem
                  key={i}
                  urlGIF={item.images.original.webp}
                  urlPrev={item.images.downsized_still.url}
                  // urlPrev={item.images.preview_webp.url}
                  alt={item.title}
                  item={item}
                />
              )
            })
          : null}
      </div>
      {isLoading ? <Loader /> : null}
    </div>
  )
}
