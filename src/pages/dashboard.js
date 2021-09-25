import React from "react";
import { Redirect } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import Container from 'react-bootstrap/Container';
import { getMeals, getToken, logOut } from '../api';

export default function () {
  const [data, setData] = React.useState([]);
  const [loggedOut, setLoggedOut] = React.useState(false);

  const columns = [{
    dataField: 'id',
    text: 'Id',
  }, {
    dataField: 'text',
    text: 'Description',
    search: true
  }, {
    dataField: 'calories',
    text: 'Calories',
    sort: true
  }, {
    dataField: 'meal_date',
    text: 'Meal Date',
    sort: true
  }, {
    dataField: 'createdAt',
    text: 'Created At',
    sort: true
  }, {
    dataField: 'updatedAt',
    text: 'Updated At',
    sort: true
  }];

  React.useEffect(() => {
    getMeals()
      .then(meals => {
        setData(meals);
      });
  }, [loggedOut]);

  function logMeOut() {
    logOut();
    setLoggedOut(true);
  }

  if (!getToken()) {
    return <Redirect to='/login' />;
  }

  return (
    <Container fluid style={{ padding: 60 }}>
      <h2 style={{ textAlign:'center' }}>Meal Activity for {getToken('username')}</h2>
      <button style={{ color: 'blue', margin: 20 }} onClick={logMeOut}>Logout</button>
      <BootstrapTable keyField='id' data={data} columns={columns} />
    </Container>
  );
}