export default function getHourWithMinutesfromDateInstance(dateInstance) {
  let hours = dateInstance.getHours();
  let minutes = dateInstance.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
