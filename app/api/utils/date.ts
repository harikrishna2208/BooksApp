import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter);

const formatDate = (date: Date): string => dayjs(date).format('YYYY-MM-DD');
const todayDate = (): string => dayjs().format('YYYY-MM-DD');
const differenceInDays = (expiryDate: Date): number =>
  dayjs(formatDate(expiryDate)).diff(todayDate(), 'days');
const expiryDate = (): string => dayjs().add(90, 'day').format();

const todayDateInLocalTimeZone = (): string => dayjs().format();

const convertUTCtoLocalTime = (date: string): dayjs.Dayjs =>
  dayjs.utc(date.substring(0, 23));

const currentYear = (): number => dayjs().year();

export {
  currentYear,
  differenceInDays,
  expiryDate,
  formatDate,
  dayjs,
  todayDateInLocalTimeZone,
  convertUTCtoLocalTime,
  todayDate,
};