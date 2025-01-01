
function convertMinutesToHoursAndMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0 && minutes === 0) {
    return "0 min";
  } else if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours} hr`;
  } else if (hours > 0 && minutes > 0) {
    return `${hours} hr, ${minutes} min`;
  }else{
    return "0 min";
  }
}


function getToday(): string {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: '2-digit' };
  return today.toLocaleDateString('en-US', options);
}

function getTodayWeekDay(): string {
  const today = new Date(); // Get the current date
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekdays[today.getDay()]; // Get today's weekday name
}

export { convertMinutesToHoursAndMinutes, getToday, getTodayWeekDay };