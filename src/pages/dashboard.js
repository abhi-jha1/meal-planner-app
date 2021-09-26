import React from "react";
import { Redirect } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import Container from 'react-bootstrap/Container';
import { getMeals, getToken, logOut, deleteMeal } from '../api';
import AddMeal from '../pages/addMeal'
import Button from "react-bootstrap/Button";

export default function () {
  const [data, setData] = React.useState([]);
  const [loggedOut, setLoggedOut] = React.useState(false);
  const [addEditModal, setAddEditModal] = React.useState(false);
  const [value, setValue] = React.useState({})




  const edit = (cell, row) => {
    return (
      <div>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => {
            console.log(row, 'row')
            setValue({ value: 'Edit', calories: row.calories, text: row.text, id: row.id })
            setAddEditModal(true)
          }}
        >
          Edit
        </Button>

        <Button
          onClick={() => {
            deleteCell(row);
          }}
        >
          Delete
        </Button>

      </div>
    );
  };



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
    dataField: "id",
    text: "Edit / Delete",
    formatter: edit,
  }];

  React.useEffect(() => {
    getMeals()
      .then(meals => {
        setData(meals);
        calculate(meals)
      });
  }, []);

  let totalCalories = 0;
  const calculate = (meals) => {

    meals.forEach((meal) => {
      totalCalories += meal.calories;
      console.log(totalCalories, 'cal')

    })
    console.log(totalCalories, 'calories')
  }

  function logMeOut() {
    logOut();
    setLoggedOut(true);
  }

  const open = () => {
    setValue({ value: 'Add' })
    setAddEditModal(true);
  }

  const handler = () => {
    console.log('i am called')
    getMeals().then(meals => {
      setData(meals)
    })
    setAddEditModal(false);
  }

  const deleteCell = (value) => {
    deleteMeal(value.id).then(() => {
      handler();
    })
  }



  if (!getToken()) {
    return <Redirect to='/login' />;
  }

  return (
    <Container fluid style={{ padding: 60 }}>
      <h2 style={{ textAlign: 'center' }}>Meal Activity for {getToken('username')}</h2>
      <Button block size="lg" type="submit" style={{ marginTop: 40, float: "right", marginBottom: 20 }} onClick={logMeOut}>
        LogOut
      </Button>
      <div style={totalCalories > 2000 ? { backgroundColor: "green" } : { backgroundColor: "antiquewhite" }}>
        <BootstrapTable keyField='id' data={data} columns={columns} />
      </div>
      {!addEditModal ? <Button block size="lg" style={{ marginTop: 40 }} onClick={open}>
        ADD
      </Button> : ''}

      {addEditModal ? <AddMeal textValue={value} handler={handler} /> : ''}
    </Container>
  );
}