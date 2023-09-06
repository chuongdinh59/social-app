export const dateFormatFromString = (stringDate) => {
  // Check if the input string matches the "yyyy-mm-dd hh:mm:ss" format
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(stringDate)) {
    const date = new Date(stringDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year} ${hours}h${minutes.toString().padStart(2, '0')}`;
  }
  // Check if the input string matches the "dd-mm-yyyy hh:mm:ss" format
  else if (/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/.test(stringDate)) {
    const parts = stringDate.split(' ');
    const datePart = parts[0];
    const timePart = parts[1];

    const dateParts = datePart.split('-');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    const time = timePart.split(':');
    const hours = time[0];
    const minutes = time[1];

    return `${hours}h${minutes.toString().padStart(2, '0')} ${day}/${month}/${year}`;
  }
  // If the input format doesn't match either, return the input as is
  else {
    return stringDate;
  }
};

export const dateFormatFromDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}h${minutes} ${day}/${month}/${year}`;
};

export function isDateValid(dateString) {
  const dateParts = dateString.split(' ');
  const [date, time] = dateParts;

  const [day, month, year] = date.split('-').map(Number);
  const [hours, minutes, seconds] = time.split(':').map(Number);

  const parsedDate = new Date(year, month - 1, day, hours, minutes, seconds);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - parsedDate;
  console.log(timeDifference);
  // Check if the time difference is greater than or equal to 24 hours (in milliseconds)
  return timeDifference <= 24 * 60 * 60 * 1000;
}
