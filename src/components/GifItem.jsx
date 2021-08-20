import { useState } from "react"
import Loader from "./Loader"
import { AnimateGifPanel } from "./animation"
import { Download } from "react-feather"
import useMediaQuery from "../hooks/useMediaQuery"
import "../styles/gifs.scss"

const GifItem = ({ urlGIF, urlPrev, title }) => {
  const [isHover, setHover] = useState(false)
  const [isLoad, setLoading] = useState(true)
  const [placeholder, setPlaceholder] = useState(true)
  let isSmallDisplay = useMediaQuery("(max-width: 768px)")

  const onLoadGifHandler = () => {
    if (placeholder) {
      setPlaceholder(false)
    }
    setLoading(false)
  }

  return (
    <div
      className="gif"
      onMouseLeave={() => setHover(false)}
      onMouseEnter={!isSmallDisplay ? () => setHover(true) : null}
      onClick={isSmallDisplay ? () => setHover(true) : null}
    >
      {placeholder && <Placeholder />}
      {isHover && <GifPanel src={urlGIF} title={title} isLoad={isLoad} />}
      <img
        src={isHover ? urlGIF : urlPrev}
        alt={title}
        onLoad={isHover ? onLoadGifHandler : () => setPlaceholder(false)}
      />
    </div>
  )
}

const GifPanel = ({ src, title, isLoad }) => {
  return (
    <AnimateGifPanel>
      <div className="gif-loader">{isLoad && <Loader />}</div>
      <div className="gif-buttons-grid">
        <a
          className="gif-button download"
          href={src}
          download
          target="_blank"
          rel="noreferrer"
        >
          <Download />
        </a>
      </div>
      <div className="gif-title-box">
        <div className="gif-title">{title}</div>
      </div>
    </AnimateGifPanel>
  )
}

const Placeholder = () => {
  return <div className="placeholder"></div>
}

export default GifItem
