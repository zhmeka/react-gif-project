import { useState } from "react"
import SearchInput from "./SearchInput"
import GifItem from "../GifItem"
import SearchResultInfo from "./SearchResultInfo"
import "../../styles/search.scss"

const SearchPage = () => {
  const [gifs, setGifs] = useState([])
  const [resultsInfo, setResultsInfo] = useState(null)

  const resultsInfoHandler = (obj) => {
    setResultsInfo(obj)
  }

  const getGifsHandler = (items) => {
    setGifs(items)
  }

  return (
    <div className="container">
      <SearchInput
        setGifs={getGifsHandler}
        setResultsInfo={resultsInfoHandler}
      />
      {resultsInfo && (
        <SearchResultInfo
          results={resultsInfo.results}
          text={resultsInfo.text}
        />
      )}
      <div className="gif-grid">
        {gifs.length > 0 &&
          gifs.map((item, i) => {
            return (
              <GifItem
                key={i}
                urlGIF={item.images.original.webp}
                urlPrev={item.images.downsized_still.url}
                title={item.title}
              />
            )
          })}
      </div>
    </div>
  )
}

export default SearchPage
