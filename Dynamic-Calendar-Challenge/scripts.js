// Array containing the names of months
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Function to get the number of days in a month
const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Function to create an array of a specified length filled with numbers from 0 to length - 1
const createArray = (length) => {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(i);
  }

  return result;
};

// Function to create data for the calendar
const createData = () => {
  const current = new Date();
  current.setDate(1);

  const startDay = current.getDay(); // Get the day of the week for the first day of the month
  const daysInMonth = getDaysInMonth(current);

  // Calculate the number of weeks needed to display the month
  const weeks = createArray(Math.ceil((daysInMonth + startDay) / 7));

  const result = [];

  // Loop through each week
  for (const weekIndex of weeks) {
    result.push({
      week: weekIndex + 1,
      days: [],
    });

    // Loop through each day of the week
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      // Calculate the day value based on the week and day index
      const day = dayIndex - startDay + weekIndex * 7 + 1;
      const isValid = day > 0 && day <= daysInMonth;

      // Push day data into the result
      result[weekIndex].days.push({
        dayOfWeek: dayIndex + 1,
        value: isValid ? day : "", // Store the day value if it's valid, otherwise store an empty string
      });
    }
  }

  return result; // Return the created data
};

// Function to add a table cell with specified class and value to the existing HTML
const addCell = (existing, classString, value) => {
  const result = /* html */ `
    ${existing}

    <td class="${classString}">&nbsp;${value}&nbsp;</td>
  `;

  return result;
};

// Function to create HTML for the calendar data
const createHtml = (data) => {
  let result = "";

  // Loop through each week of data
  for (const { week, days } of data) {
    let inner = "";
    inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week}`); // Add week label cell

    // Loop through each day of the week
    for (const { dayOfWeek, value } of days) {
      const isToday = new Date().getDate() === value; // Check if the day is today
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Check if the day is weekend
      const isAlternate = week % 2 === 0; // Check if it's an alternate week

      let classString = "table__cell";

      // Add additional classes based on conditions
      if (isToday) classString += " table__cell_today";
      if (isWeekend) classString += " table__cell_weekend";
      if (isAlternate) classString += " table__cell_alternate";

      // Add cell to the inner HTML
      inner = addCell(inner, classString, value);
    }

    // Add the row with cells to the result
    result += `
        <tr>${inner}</tr>
      `;
  }

  return result; // Return the generated HTML
};

// Set the title of the calendar to the current month and year
const current = new Date();
document.querySelector("[data-title]").innerText = `${
  MONTHS[current.getMonth()]
} ${current.getFullYear()}`;

// Generate data for the calendar
const data = createData();

// Render the calendar HTML
document.querySelector("[data-content]").innerHTML = createHtml(data);
