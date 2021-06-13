export function formatDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${appendZero(month)}/${appendZero(day)}/${date.getFullYear()}`;
}

function appendZero(value) {
  return value < 10 ? "0" + value : value;
}
