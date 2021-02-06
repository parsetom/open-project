import moment from 'moment';
export const universalDateFormat = 'YYYY-MM-DD';

export function toDateString(date) {
  if (date && moment.isDate(date)) {
    return moment(date).format(universalDateFormat);
  }
  // Unless we have a valid date we are sending blank values
  return '';
}
