import "../assets/scss/components/sunrise.scss";

export default function Sunrise() {
  return (
    // <svg
    //       className="sunrise__icon"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         d="M12 10V3M12 3L9 6M12 3L15 6M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18"
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    <div className="sunrise">
      <h2 className="sunrise__time">5:28 AM</h2>
      <span className="sunrise__sunset-time">Sunset 7:25PM</span>
    </div>
  );
}
