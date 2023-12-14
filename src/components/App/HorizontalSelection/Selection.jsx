export default function Selection({ className, onClick, value, text }) {
  return (
    <div
      onClick={(event) => onClick(event, value)}
      className={
        "horizontal-selection__selection" + (className ? ` ${className}` : "")
      }
      data-value={value}
    >
      {text}
    </div>
  );
}
