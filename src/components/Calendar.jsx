import { useState, useEffect } from 'react'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// A helper list of unsplash images for different months to give it a physical calendar feel
const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=2000&auto=format&fit=crop", // Jan
  "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=2000&auto=format&fit=crop", // Feb
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2000&auto=format&fit=crop", // Mar
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=2000&auto=format&fit=crop", // Apr
  "https://images.unsplash.com/photo-1465146344425-f00d5f508faf?q=80&w=2000&auto=format&fit=crop", // May
  "https://images.unsplash.com/photo-1488665796245-c4960d1512db?q=80&w=2000&auto=format&fit=crop", // Jun
  "https://images.unsplash.com/photo-1478059299873-f044d5c8f62f?q=80&w=2000&auto=format&fit=crop", // Jul
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop", // Aug
  "https://images.unsplash.com/photo-1444464666168-49b626d49c66?q=80&w=2000&auto=format&fit=crop", // Sep
  "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2000&auto=format&fit=crop", // Oct
  "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=2000&auto=format&fit=crop", // Nov
  "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2000&auto=format&fit=crop"  // Dec
];

const MONTH_COLORS = [
  { main: '#3b82f6', light: '#eff6ff' }, // Jan (Winter blue)
  { main: '#6366f1', light: '#e0e7ff' }, // Feb (Indigo)
  { main: '#10b981', light: '#ecfdf5' }, // Mar (Spring green)
  { main: '#f59e0b', light: '#fffbeb' }, // Apr (Yellow/Orange)
  { main: '#22c55e', light: '#f0fdf4' }, // May (Forest green)
  { main: '#0ea5e9', light: '#f0f9ff' }, // Jun (Sky blue)
  { main: '#f97316', light: '#fff7ed' }, // Jul (Sun orange)
  { main: '#06b6d4', light: '#ecfeff' }, // Aug (Ocean cyan)
  { main: '#d97706', light: '#fffbeb' }, // Sep (Autumn gold)
  { main: '#ea580c', light: '#fff7ed' }, // Oct (Fall orange)
  { main: '#8b5cf6', light: '#f5f3ff' }, // Nov (Deep purple)
  { main: '#ef4444', light: '#fef2f2' }  // Dec (Holiday red)
];

const HOLIDAYS = {
  0: { 1: "New Year's Day", 14: "Makar Sankranti", 26: "Republic Day" },
  1: { 14: "Vasant Panchami" },
  2: { 3: "Holi" }, // Example: Holi for 2026
  3: { 14: "Ambedkar Jayanti" },
  4: { 1: "Labour Day" },
  5: { 5: "World Environment Day" },
  6: {},
  7: { 15: "Independence Day", 28: "Raksha Bandhan" },
  8: { 14: "Ganesh Chaturthi" },
  9: { 2: "Gandhi Jayanti", 19: "Dussehra" },
  10: { 8: "Diwali", 14: "Children's Day" }, // Example: Diwali for 2026
  11: { 25: "Christmas Day" }
};

const Calendar = ({ currentDate, setCurrentDate, selectedRange, onDateSelect }) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Apply dynamic theming
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', MONTH_COLORS[month].main);
    root.style.setProperty('--primary-light', MONTH_COLORS[month].light);
  }, [month]);

  // Generate blank spaces for previous month days
  const blanks = Array.from({ length: firstDayIndex }, (_, i) => i);
  // Generate days for current month
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isSelected = (day) => {
    const d = new Date(year, month, day);
    if (selectedRange.start && d.getTime() === selectedRange.start.getTime()) return true;
    if (selectedRange.end && d.getTime() === selectedRange.end.getTime()) return true;
    return false;
  };

  const isBetween = (day) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    const d = new Date(year, month, day).getTime();
    const start = selectedRange.start.getTime();
    const end = selectedRange.end.getTime();
    return d > start && d < end;
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const heroImage = MONTH_IMAGES[month];

  return (
    <div className="calendar-card">
      <div className="calendar-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="calendar-hero-overlay">
          <h2>{currentDate.toLocaleString('default', { month: 'long' })}</h2>
          <p>{year}</p>
        </div>
      </div>
      
      <div className="calendar-body">
        <div className="calendar-header">
          <button onClick={prevMonth} className="nav-btn">&larr;</button>
          <div className="current-month">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <button onClick={nextMonth} className="nav-btn">&rarr;</button>
        </div>

        <div className="calendar-grid-header">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="day-name">{day}</div>
          ))}
        </div>

        <div className="calendar-grid" key={`${year}-${month}`}>
          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="day empty"></div>
          ))}
          {monthDays.map((day) => {
            const selected = isSelected(day);
            const between = isBetween(day);
            const today = isToday(day);
            
            // Check if it's start or end
            const dTime = new Date(year, month, day).getTime();
            const isStart = selectedRange.start && dTime === selectedRange.start.getTime();
            const isEnd = selectedRange.end && dTime === selectedRange.end.getTime();

            let classes = ['day'];
            if (selected) classes.push('selected');
            if (between) classes.push('between');
            if (today) classes.push('today');
            if (isStart) classes.push('range-start');
            if (isEnd) classes.push('range-end');

            const holidayName = HOLIDAYS[month][day];

            return (
              <div 
                key={`day-${day}`} 
                className={classes.join(' ')}
                onClick={() => onDateSelect(new Date(year, month, day))}
                title={holidayName}
              >
                <span>{day}</span>
                {holidayName && <div className="holiday-marker"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
