import { useEffect, useState } from "react"
import { GiphyFetch } from "@giphy/js-fetch-api"
import "../styles/home.scss"

export default function HomePage() {
  const [background, setBackground] = useState(null)

  useEffect(() => {
    async function getData() {
      const gf = new GiphyFetch("xYgJNGRcmb1vMOflhwyjjiv0SpwJ0mfR")
      const { data: gif } = await gf.random({ tag: "cat", type: "gifs" })
      setBackground(gif)
    }
    getData()
  }, [])

  return (
    <div className="home">
      {background ? <CircleGif src={background.images.original.url} /> : null}
      <h1>Добро пожаловать</h1>
    </div>
  )
}

function CircleGif({ src }) {
  return <img className="home-gif" src={src} alt="Кiт" />
}
