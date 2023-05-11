import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://traineeapp.azurewebsites.net/gettrainings');
      const data = await response.json();
  
      const formattedEvents = data.map((event) => {
        const startDate = new Date(event.date);
        const endDate = new Date(startDate.getTime() + event.duration * 60000);
      
        const hours = startDate.getHours().toString().padStart(2, '0');
        const minutes = startDate.getMinutes().toString().padStart(2, '0');
        const customerName = `${event.customer.firstname} ${event.customer.lastname}`;
        
        return {
          title: `${event.activity} - ${hours}:${minutes} - ${customerName}`,
          start: startDate,
          end: endDate,
        }
      });
  
      console.log(formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
