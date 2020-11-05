export function buildCalendar(value) {
    const startDate = value.clone().startOf('month').startOf('week');
    const endDate = value.clone().endOf('month').endOf('week');
    const day = startDate.clone().subtract(1, 'day');
    const calender = [];
    while (day.isBefore(endDate, 'day')) {
      calender.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone())
      );
    }
    return calender;
  }
 
  export function isSelected(day, value) {
    if (value.isSame(day, 'day')) {
      return 'selected';
    } else {
      return '';
    }
  }
  
  export function dayStyle(day, index) {
    if (index === 0 || index === 1 || day.isBefore(new Date(), 'day')) {
      return { style: 'before' };
    } else if (index === 2) {
      return { style: 'overnight', price: 79.99 };
    } else if (index === 6) {
      return { style: 'saturday', price: 9.99 };
    } else {
      return { style: 'standard', price: 9.99 };
    }
  }
  