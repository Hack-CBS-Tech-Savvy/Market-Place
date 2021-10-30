import { Box, Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "./Error";

export const Home = () => {
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

  return (
    <Box>
      Home
      <Button onClick={sendData} isLoading={isUserUpdating}>
        {" "}
        Send API Data
      </Button>
      <Button onClick={getData} isLoading={isUserUpdating}>
        {" "}
        Get API Data
      </Button>
      <Button onClick={updateData} isLoading={isUserUpdating}>
        {" "}
        Update API Data
      </Button>
      <Button onClick={deleteData} isLoading={isUserUpdating}>
        {" "}
        Delete API Data
      </Button>
      <Button onClick={getUserSpecificData} isLoading={isUserUpdating}>
        {" "}
        Get User Specific Data
      </Button>
      <Button onClick={deleteSpecificData} isLoading={isUserUpdating}>
        {" "}
        Delete User Specific Data
      </Button>
    </Box>
  );
};
