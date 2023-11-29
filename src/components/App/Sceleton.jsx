import "../../assets/scss/components/sceleton.scss";

export default function Sceleton({
  width,
  height,
  border,
  borderRadius,
  margin,
}) {
  return (
    <div
      style={{
        width,
        height,
        border,
        borderRadius,
        margin,
      }}
      className="sceleton-rectangle"
    ></div>
  );
}
