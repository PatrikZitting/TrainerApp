import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from 'dayjs';

const TrainingsList = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data));
  }, []);

  const columns = [
    {
      headerName: 'Date',
      field: 'date',
      sortable: true,
      filter: true,
      floatingFilter: true,
      valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm')
    },
    {
      headerName: 'Duration (minutes)',
      field: 'duration',
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Activity',
      field: 'activity',
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Customer',
      field: 'customer',
      sortable: true,
      filter: true,
      floatingFilter: true,
      valueGetter: params => `${params.data.customer.firstname} ${params.data.customer.lastname}`
    }
  ];

  return (
    <div className="ag-theme-alpine-dark" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        columnDefs={columns}
        rowData={trainings}
        animateRows={true}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      />
    </div>
  );
};

export default TrainingsList;
