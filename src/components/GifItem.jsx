import "../styles/gifs.scss"
import { useState } from "react"

export default function GifItem({ urlGIF, urlPrev, alt, item }) {
  const [isHover, setHover] = useState(false)
  const [placeholder, setPlaceholder] = useState(true)

  return (
    <div
      className="gif"
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      {placeholder ? <Placeholder /> : null}
      {isHover ? <GifButtons src={urlGIF} /> : null}
      <img
        style={placeholder ? { display: "none" } : {}}
        src={isHover ? urlGIF : urlPrev}
        alt={alt}
        onLoad={() => setPlaceholder(false)}
      />
    </div>
  )
}

function GifButtons({ src }) {
  return (
    <div className="gif-buttons-grid">
      <button className="gif-button like">
        <i className="icon-like"></i>
      </button>
      <a
        className="gif-button download"
        href={src}
        download
        target="_blank"
        rel="noreferrer"
      >
        <i className="icon-download"></i>
      </a>
    </div>
  )
}

function Placeholder() {
  return <div className="placeholder"></div>
}
