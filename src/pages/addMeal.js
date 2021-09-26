import React from 'react';
import {getToken, addMeal, update } from '../api';
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default function({handler,textValue}) {

    console.log(textValue,'text text')
  

  const [text,setText] = React.useState('')
  const [calories,setCalories] = React.useState(0);

  React.useEffect(() => {
      if(textValue.value === 'Edit'){
        setText(textValue.text);
        setCalories(textValue.calories)
      }
  }, []);



  async function handleSubmit(event) {
    event.preventDefault();
    const meal_date = new Date();
    const meal = textValue.value === 'Add'? await addMeal({meal_date, calories,text}):await update(textValue.id,{meal_date,calories,text}) ;
    if (meal){
     handler()
    } else {
      alert("something went wrong");
    }
  }

  const addCalories = (value)=>{
      if(value.target.validity.valid) setCalories(value.target.value)
  }

  function validateForm() {
    return text.length > 0 && calories > 0;
  }

  if (!getToken()) {
    return <Redirect to='/login' />;
  }

  return(  <Container fluid style={{ padding: 60 }}>
    <h2 style={{ textAlign:'center' }}>{textValue?.value} Meal for {getToken('username')}</h2>
  
    <Form onSubmit={handleSubmit}>
   
      <Form.Group size="lg" controlId="text">
        <Form.Label>text</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>

      <Form.Group size="lg" controlId="calories">
        <Form.Label>Calories</Form.Label>
        <Form.Control
          type="text" pattern="[0-9]*"
          value={calories}
          onChange={(e) => addCalories(e)}
        />
      </Form.Group>

      <Button block size="lg" type="submit" style={{ marginTop: 40 }} disabled={!validateForm()}>
        Submit
      </Button>
    </Form>
  </Container>)
}

