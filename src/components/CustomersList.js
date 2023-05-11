import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomerForm from './CustomerForm';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  };

  const handleAddCustomer = (customerData) => {
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    })
      .then(response => response.json())
      .then(data => {
        fetchCustomers();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleEditCustomer = (customerData) => {
    const url = `https://traineeapp.azurewebsites.net/api/customers/${selectedCustomer.id}`;
    console.log("URL: ", url);
    console.log("Data: ", customerData);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
        } else {
          console.error('Error:', response);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDeleteClick = (customer) => {
    const customerId = customer.links.find(link => link.rel === 'self').href.split('/').pop();
    
    if (window.confirm("Are you sure? This will delete customer and related trainings.")) {
      handleDeleteCustomer(customerId);
    }
  };
  
  const handleDeleteCustomer = (id) => {
    console.log('handleDeleteCustomer', id);
    fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        fetchCustomers();
      } else {
        console.error('Error:', response);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleRowSelected = (event) => {
    const customerId = event.node.data.links.find(link => link.rel === 'self').href.split('/').pop();
    setSelectedCustomer({...event.node.data, id: customerId});
  };

  const handleEditClick = (customerData) => {
    console.log(customerData);
    const customerId = customerData.links.find(link => link.rel === 'self').href.split('/').pop();
    setSelectedCustomer({...customerData, id: customerId});
    setIsEdit(true);
    setShowForm(true);
  };

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
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRendererFramework: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={() => handleEditClick(params.data)}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.data)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
        Add Customer
      </Button>
      <div className="ag-theme-alpine-dark" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          columnDefs={columns}
          rowData={customers}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
          onRowSelected={handleRowSelected}
        />
      </div>
      {showForm && (
        <Modal
          open={showForm}
          onClose={() => setShowForm(false)}
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
            <h3>{isEdit ? 'Edit' : 'Add'} Customer</h3>
            <CustomerForm
              onSubmit={isEdit ? handleEditCustomer : handleAddCustomer}
              initialValues={isEdit ? selectedCustomer : {}}
              isEdit={isEdit}
              closeForm={() => setShowForm(false)}
            />

            {isEdit && (
              <button onClick={() => setIsEdit(false)}>Cancel Edit</button>
            )}
            <button onClick={() => setShowForm(false)}>Hide Form</button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CustomersList;
