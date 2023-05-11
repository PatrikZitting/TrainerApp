import React, { useState, useEffect } from 'react';

const TrainingForm = ({ onSubmit, customers }) => {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [activity, setActivity] = useState('');
  const [customerId, setCustomerId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      date,
      duration: parseInt(duration, 10),
      activity,
      customer: customerId,
    });
    setDate('');
    setDuration('');
    setActivity('');
    setCustomerId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Activity:</label>
        <input
          type="text"
          value={activity}
          onChange={(event) => setActivity(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Customer:</label>
        <select
          value={customerId}
          onChange={(event) => setCustomerId(event.target.value)}
          required
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.links[0].href} value={customer.links[0].href}>
              {customer.firstname} {customer.lastname}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Training</button>
    </form>
  );
};

export default TrainingForm;
