import { useEffect, useState } from "react"
import { GiphyFetch } from "@giphy/js-fetch-api"
import { AnimatedHomeGif } from "./animation"
import "../styles/home.scss"

export default function HomePage() {
  const [background, setBackground] = useState(null)

  useEffect(() => {
    let cleanupFunction = false
    async function getData() {
      const gf = new GiphyFetch(process.env.REACT_APP_SDK_KEY)
      const { data: gif } = await gf.random({ tag: "cat", type: "gifs" })
      if (!cleanupFunction) setBackground(gif.images.original.url)
    }
    getData()
    return () => (cleanupFunction = true)
  }, [])

  return (
    <div className="home">{background && <CircleGif src={background} />}</div>
  )
}

const CircleGif = ({ src }) => {
  const [isLoaded, setLoading] = useState(false)
  return (
    <AnimatedHomeGif isLoaded={isLoaded}>
      <img
        className="home-gif"
        onLoad={() => setLoading(true)}
        src={src}
        alt="Кiт"
      />
    </AnimatedHomeGif>
  )
}
