import {Form, Button, Container} from 'react-bootstrap';
import { useMoralis } from "react-moralis";
import React from 'react';

function APIform(){
    const { Moralis, isUserUpdating } = useMoralis();

    const sendData = (event) => {
        const API_DATABASE = Moralis.Object.extend("API_DATABASE");
        const apiDatabase = new API_DATABASE();
        apiDatabase.set("User", Moralis.User.current());
        apiDatabase.set("Name", "My Cool API");
        apiDatabase.set("Description", "This is a cool API");
        apiDatabase.set("URL", "https://www.google.com");
        apiDatabase.save().then(() => {
          console.log("Successfully saved.");
        });
      };

    return(
        <Container className="form">
        <h3 className="heading">Add Your Own API</h3>
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>API Name</Form.Label>
        <Form.Control type="name" placeholder="Bitcoin API" />
    </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
    </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>API Logo</Form.Label>
        <Form.Control type="file" />
    </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>API URL</Form.Label>
        <Form.Control type="text" placeholder="Bitcoin API" />
    </Form.Group>
    <Button variant="warning" size="lg" type="submit" onClick={sendData} isLoading={isUserUpdating}>
    Submit
  </Button>
    </Form>
        </Container>
        
    )
}

export default APIform;