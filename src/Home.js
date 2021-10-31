import { Box, Button, Collapse } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "./Error";
import Navbar from "react-bootstrap/Navbar";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";
import React from "react";

export const Home = () => {
  const { Moralis, isUserUpdating } = useMoralis();

  const [allAPI, setAllAPI] = useState([]);

  const getData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const query = new Moralis.Query(API_DATABASE);
    query.ascending("Name");
    query.find().then((results) => {
      setAllAPI(results);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <div>
      <Navbar bg="dark" className="navigation-bar-margin" variant="dark">
        <Nav className="me-auto">
          <Nav.Link>
            {" "}
            <Link to="/addAPI">
              <Button isLoading={isUserUpdating}> Register your API</Button>{" "}
            </Link>
          </Nav.Link>

          <Nav.Link>
            {" "}
            <Link to="/getUserAPI">
              <Button isLoading={isUserUpdating}> Your APIs</Button>
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Stack spacing={4}>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>The Market Place</TableCaption>
          <Thead>
            <Tr>
              <Th>API Name</Th>
              <Th isTruncated>API Description</Th>
              <Th>Link to the Docs</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allAPI &&
              allAPI.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.get("Name")}</Td>
                    <Td>
                      <Collapse startingHeight={20} in={show}>
                        <Text>{item.get("Description")}</Text>
                      </Collapse>
                      <Button size="sm" onClick={handleToggle} mt="1rem">
                        Show {show ? "Less" : "More"}
                      </Button>
                    </Td>
                    <Td>{item.get("URL")}</Td>
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>API Name</Th>
              <Th>Description</Th>
              <Th>Docs</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Stack>
    </div>
  );
};
