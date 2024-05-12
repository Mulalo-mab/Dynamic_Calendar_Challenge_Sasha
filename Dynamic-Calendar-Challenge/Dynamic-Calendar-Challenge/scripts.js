// scripts.js

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

const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Only edit below

const createArray = (length) => {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push();
  }

  return result;
};

const createData = () => {
  const current = new Date();
  current.setDate(1);

  const startDay = current.getDate();
  const daysInMonth = getDaysInMonth(current);

  const weeks = createArray(5);
  const days = createArray(daysInMonth);
  const result = [];

  for (const weekIndex of weeks) {
    result.push({
      week: weekIndex + 1,
      days: [],
    });

    for (const dayIndex of daysArray) {
      const day = dayIndex - startDay + weekIndex * 7 + 1; // Calculate the day value
      const isValid = day > 0 && day <= daysInMonth;

      result[weekIndex].days.push({
        dayOfWeek: dayIndex + 1,
        value: isValid ? day : "",
      });
    }
  }
};

const addCell = (existing, classString, value) => {
  const result = /* html */ `
        ${existing}

        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;

  return result;
};

const createHtml = (data) => {
  let result = "";

  for (const { week, days } of result) {
    let inner = "";
    inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week}`);

    for (const { dayOfWeek, value } of days) {
      const isToday = new Date().getDate() === value;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isAlternate = week % 2 === 0;

      let classString = "table__cell";

      if (isToday) classString += " table__cell_today"; // Add class for today's cell
      if (isWeekend) classString += " table__cell_weekend"; // Add class for weekend cells
      if (isAlternate) classString += " table__cell_alternate"; // Add class for alternate week cells
      inner = addCell(inner, classString, value); // Add the cell to the inner HTML string
    }

    result = `
            ${result}
            <tr>${inner}</tr>
        `;
  }

  return result;
};

// Only edit above

const current = new Date();
document.querySelector("[data-title]").innerText = `${
  MONTHS[current.getMonth()]
} ${current.getFullYear()}`;

const data = createData();
document.querySelector("[data-content]").innerHTML = createHtml(data);
