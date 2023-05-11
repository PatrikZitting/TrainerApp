import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  }, []);

  const columns = [
    {
      headerName: 'First Name',
      field: 'firstname',
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Last Name',
      field: 'lastname',
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Street Address',
      field: 'streetaddress',
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Postcode',
      field: 'postcode',
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'City',
      field: 'city',
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      floatingFilter: true
    }
  ];

  return (
    <div className="ag-theme-alpine-dark" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        columnDefs={columns}
        rowData={customers}
        animateRows={true}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      />
    </div>
  );
};

export default CustomersList;
