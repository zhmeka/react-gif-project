import { useState } from "react"
import { GiphyFetch } from "@giphy/js-fetch-api"
import { AlertCircle } from "react-feather"

const CreateTextForm = ({ setGifs, setLoading }) => {
  const [text, setText] = useState("")
  const submit = async (e) => {
    e.preventDefault()
    if (text) {
      setGifs([])
      setLoading(true)
      const gf = new GiphyFetch(process.env.REACT_APP_SDK_KEY)
      const { data: gifs } = await gf.animate(text, { limit: 16 })
      setLoading(false)
      setGifs(gifs)
    }
  }

  const textHandler = (e) => {
    const limit = 50
    if (
      !e.target.value.match(/[^A-Za-z0-9_ ]/) &&
      e.target.value.length <= limit
    ) {
      setText(e.target.value)
    }
  }

  return (
    <form onSubmit={submit} className="create-text">
      <div className="create-text-info">
        <AlertCircle /> Поддерживаются только латинские буквы и цифры
      </div>
      <div className="create-text-wrap">
        <input
          placeholder="Введите ваш текст..."
          type="text"
          onChange={textHandler}
          value={text}
        />
        {text && <button type="submit">Создать</button>}
      </div>
    </form>
  )
}

export default CreateTextForm
