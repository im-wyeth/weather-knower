import "../assets/scss/layouts/default-layout.scss";

export default function DefaultLayout({ children }) {
  return (
    <div className="wrapper">
      <div className="default-layout">{children}</div>
    </div>
  );
}
