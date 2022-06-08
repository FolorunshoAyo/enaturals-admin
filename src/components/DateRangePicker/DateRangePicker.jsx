import React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import './DateRangePicker.css';

const DateRangePicker = ({placeholder}) => {
    const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 2);
    
    return(
        <DateRangePickerComponent 
            placeholder={placeholder}
            startDate={startValue}
            endDate={endValue}
            format="dd-MMM-yy"
            start="Year"
            depth="Year"
        />
    );
};



export default DateRangePicker;
