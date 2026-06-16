import "../index.css";
import "../css/banner.css"
function Banner() {
  return (
    <header className="banner-section">
      <div className="banner-overlay">
        <div className="banner-text">
          <p className="subtitulo">EXPLORA EL MUNDO</p>
          <h1 className="titulo">SPA <span>RESTCOUNTRIES</span></h1>
          <p className="description">
            Descubre datos, poblaciones y capitales de todos los países 
            del mundo.
          </p>
        </div>
      </div>
    </header>
  )
}

export default Banner
