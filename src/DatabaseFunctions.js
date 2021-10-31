import { Box, Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "./Error";
import Navbar from "react-bootstrap/Navbar";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Stack, Text } from "@chakra-ui/react";

export const Functions = () => {
  const { Moralis, isUserUpdating } = useMoralis();

  const sendData = () => {
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

  const getData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const query = new Moralis.Query(API_DATABASE);
    query.find().then((results) => {
      console.log(results);
    });
  };

  const updateData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const query = new Moralis.Query(API_DATABASE);
    query.equalTo("Name", "My Cool API");
    query.equalTo("User", Moralis.User.current());
    query.find().then((results) => {
      const apiDatabase = results[0];
      apiDatabase.set("Description", "This is a not a cool API");
      apiDatabase.save().then(() => {
        console.log("Successfully saved.");
      });
    });
  };

  const deleteData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const query = new Moralis.Query(API_DATABASE);
    query.equalTo("Name", "My Cool API");
    query.find().then((results) => {
      const apiDatabase = results[0];
      if (apiDatabase)
        apiDatabase.destroy().then(() => {
          console.log("Successfully deleted.");
        });
      else alert("No Records found");
    });
  };

  const getUserSpecificData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const query = new Moralis.Query(API_DATABASE);
    query.equalTo("Name", "My Cool API");
    query.equalTo("User", Moralis.User.current());
    query.find().then((results) => {
      console.log(results);
    });
  };

  const deleteSpecificData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const query = new Moralis.Query(API_DATABASE);
    query.equalTo("Name", "My Cool API");
    query.equalTo("User", Moralis.User.current());

    try {
      query.find().then((results) => {
        const apiDatabase = results[0];
        if (apiDatabase)
          apiDatabase.destroy().then(() => {
            console.log("Successfully deleted.");
          });
        else alert("No data found");
      });
    } catch (e) {
      <ErrorBox title={"Not able to delete"} message={e} />;
      console.log(e);
    }
  };

  const likeAPI = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const query = new Moralis.Query(API_DATABASE);
    query.equalTo("Name", "My Cool API");
    query.equalTo("User", Moralis.User.current());
    query.find().then((results) => {
      const apiDatabase = results[0];
      if (apiDatabase) {
        apiDatabase.increment("Likes");
        apiDatabase.save().then(() => {
          console.log("Successfully saved.");
        });
      } else alert("No data found");
    });
  };

  const getSortedData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const query = new Moralis.Query(API_DATABASE);
    query.descending("Likes");
    query.find().then((results) => {
      console.log(results);
    });
  };

  return <Box>Nothing to see here</Box>;
};
