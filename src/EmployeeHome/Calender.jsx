import { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths } from 'date-fns';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";

        return (
            <div>
                <h2 className='text-3xl font-semibold text-center my-6'>Calendar</h2>
                <div className="flex justify-between items-center p-4 bg-blue-400 text-white rounded-t-lg">
                <button onClick={prevMonth} className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-blue-500">Prev</button>
                <span className="text-lg">{format(currentMonth, dateFormat)}</span>
                <button onClick={nextMonth} className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-blue-500">Next</button>
            </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const dateFormat = "EEEE";
        const startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="w-1/7 text-center py-2">
                    {format(addDays(startDate, i), dateFormat).substring(0, 3)}
                </div>
            );
        }

        return <div className="flex justify-between text-center bg-gray-100 py-2 md:px-4">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        key={day}
                        className={`w-1/7 h-20 flex items-center justify-center cursor-pointer ${day.getMonth() === currentMonth.getMonth() ? 'bg-white' : 'bg-white'} ${day.toDateString() === new Date().toDateString() ? 'bg-blue-100 md:px-3 rounded-xl' : ''}`}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span>{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day} className="flex justify-between w-full">
                    {days}
                </div>
            );
            days = [];
        }
        return <div>{rows}</div>;
    };

    const onDateClick = day => {
        setSelectedDate(day);
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    return (
        <div>
            <div className=" md:p-12 text-center md:mx-12 shadow-lg rounded-lg">
                {renderHeader()}
                {renderDays()}
                {renderCells()}
            </div>
        </div>
    );
};

export default Calendar;
