import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from 'dayjs';
import TrainingForm from './TrainingForm';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const TrainingsList = () => {
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data));
  }, []);

  useEffect(() => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  }, []);

  const fetchTrainings = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data));
  };

  const handleAddTraining = (newTraining) => {
    fetch('https://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTraining),
    })
      .then((response) => response.json())
      .then((data) => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
          .then(response => response.json())
          .then(data => setTrainings(data));
        handleClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDeleteClick = (training) => {
    console.log(training);
    const trainingId = training.id;
    if (window.confirm("Are you sure you want to delete this training?")) {
      handleDeleteTraining(trainingId);
    }
  };
  
  const handleDeleteTraining = (id) => {
    console.log('handleDeleteTraining', id);
    fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        fetchTrainings();
      } else {
        console.error('Error:', response);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRendererFramework: (params) => (
        <>
          <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.data)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Training
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add Training</h2>
          <TrainingForm onSubmit={handleAddTraining} customers={customers} />
        </Box>
      </Modal>
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
    </>
  );
};

export default TrainingsList;
