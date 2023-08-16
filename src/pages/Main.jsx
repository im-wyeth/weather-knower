import "../assets/scss/pages/main.scss";
import MainBottomNavigation from "../components/MainBottomNavigation";
import MainWeatherDetails from "../components/MainWeatherDetails";

export default function Main() {
  return (
    <main className="main">
      <section className="main__important-info">
        <div className="main__place">Bengaluru</div>
        <div className="main__weather-degrees">19°</div>
        <div className="main__weather-state">Mostly Clear</div>
        <div className="main__degree-limits">H:24° L:18°</div>
      </section>

      <section className="main__image">
        <img
          className="main__image-object"
          src={require("../assets/images/house.png")}
          alt="object"
        />
      </section>

      <MainWeatherDetails />

      <MainBottomNavigation />
    </main>
  );
}
