import React, { useState, useEffect } from 'react';

const CustomerForm = ({ onSubmit, initialValues = {}, isEdit = false }) => {
  const [firstName, setFirstName] = useState(initialValues.firstname || '');
  const [lastName, setLastName] = useState(initialValues.lastname || '');
  const [streetAddress, setStreetAddress] = useState(initialValues.streetaddress || '');
  const [postcode, setPostcode] = useState(initialValues.postcode || '');
  const [city, setCity] = useState(initialValues.city || '');
  const [email, setEmail] = useState(initialValues.email || '');
  const [phone, setPhone] = useState(initialValues.phone || '');

  const handleSubmit = (event) => {
    event.preventDefault();

    const customerData = {
      firstname: firstName,
      lastname: lastName,
      streetaddress: streetAddress,
      postcode,
      city,
      email,
      phone,
    };

    onSubmit(customerData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        id="firstName"
        type="text"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        type="text"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        required
      />

      <label htmlFor="streetAddress">Street Address:</label>
      <input
        id="streetAddress"
        type="text"
        value={streetAddress}
        onChange={(event) => setStreetAddress(event.target.value)}
        required
      />

      <label htmlFor="postcode">Postcode:</label>
      <input
        id="postcode"
        type="text"
        value={postcode}
        onChange={(event) => setPostcode(event.target.value)}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="phone">Phone:</label>
      <input
        id="phone"
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        required
      />

      <button type="submit">{isEdit ? 'Edit' : 'Add'} Customer</button>
    </form>
  );
};

export default CustomerForm;
