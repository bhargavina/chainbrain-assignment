import { historyActions } from "../constants/Constants";
import _ from "lodash";
import messages from "../constants/Messages";

export function getDefaultHistory() {
  return [
    {
      id: 1,
      action: historyActions.add,
      columnNum: 4,
      rowNum: 2,
      date: (function () {
        const date = new Date();
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(59);
        return new Date(date);
      })(),
      time: (function () {
        const date = new Date();
        date.setHours(10);
        date.setMinutes(30);
        date.setSeconds(0);
        return new Date(date);
      })(),
    },
    {
      id: 2,
      action: historyActions.delete,
      columnNum: 3,
      rowNum: 2,
      date: (function () {
        const date = new Date(2022, 3, 1);
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(59);
        return new Date(date);
      })(),
      time: (function () {
        const date = new Date(2022, 3, 1);
        date.setHours(12);
        date.setMinutes(30);
        date.setSeconds(0);
        return new Date(date);
      })(),
    },
    {
      id: 3,
      action: historyActions.add,
      columnNum: 2,
      rowNum: 1,
      date: (function () {
        const date = new Date();
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(59);
        return new Date(date);
      })(),
      time: (function () {
        const date = new Date();
        date.setHours(16);
        date.setMinutes(30);
        date.setSeconds(0);
        return new Date(date);
      })(),
    },
  ];
}

function getMonthName(monthNum) {
  switch (monthNum) {
    case 0:
      return messages["MonthNames.january"];
    case 1:
      return messages["MonthNames.february"];
    case 2:
      return messages["MonthNames.march"];
    case 3:
      return messages["MonthNames.april"];
    case 4:
      return messages["MonthNames.may"];
    case 5:
      return messages["MonthNames.june"];
    case 6:
      return messages["MonthNames.july"];
    case 7:
      return messages["MonthNames.august"];
    case 8:
      return messages["MonthNames.september"];
    case 9:
      return messages["MonthNames.october"];
    case 10:
      return messages["MonthNames.november"];
    case 11:
      return messages["MonthNames.december"];
    default:
      return "";
  }
}

function formatTime(time) {
  const hours = new Date(time).getHours();
  const minutes = new Date(time).getMinutes();
  return `${hours > 9 ? hours : `0${hours}`}:${
    minutes > 9 ? minutes : `0${minutes}`
  }`;
}

function formatEventAction(action, colNum, rowNum) {
  let actionPastTense = "";
  switch (action) {
    case historyActions.add:
      actionPastTense = "added";
      break;
    case historyActions.delete:
      actionPastTense = "deleted";
      break;
    case historyActions.modify:
      actionPastTense = "modified";
      break;
    default:
      actionPastTense = "";
  }
  return `${actionPastTense} value at row ${rowNum}, column ${colNum}`;
}

function getDateLongFormat(date) {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const monthName = getMonthName(month);
  const dayOfTheMonth = dateObject.getDate();
  return `${monthName} ${dayOfTheMonth}, ${year}`;
}

function getHeadingFromDate(date) {
  const todayDateStart = new Date();
  const secondsDiff = todayDateStart - date;
  const daysDiff = Math.round(Math.abs(secondsDiff) / (1000 * 60 * 60 * 24));
  let heading = "";
  if (daysDiff === 1) {
    heading = `${messages["Drawer.date.yesterday"]} (${getDateLongFormat(
      date
    )})`;
  } else if (daysDiff === 0) {
    heading = `${messages["Drawer.date.today"]} (${getDateLongFormat(date)})`;
  } else {
    heading = `${getDateLongFormat(date)}`;
  }
  return heading;
}

export function formatHistory(items) {
  const groupedByDate = _.groupBy(items, (item) => item.date);
  const formattedItems = Object.keys(groupedByDate).map((group) => ({
    heading: getHeadingFromDate(new Date(group)),
    events: groupedByDate[group].sort((a, b) => new Date(b.time).valueOf() - new Date(a.time).valueOf()).map((e) => ({
      ...e,
      formattedTime: formatTime(e.time),
      formattedString: formatEventAction(e.action, e.columnNum, e.rowNum),
    })),
  }));
  return formattedItems;
}
