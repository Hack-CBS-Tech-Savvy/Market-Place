import { Box, Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

export const Home = () => {
  const { Moralis, isUserUpdating } = useMoralis();

  const sendData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const apiDatabase = new API_DATABASE();
    apiDatabase.set("Name", "My Cool API");
    apiDatabase.set("Description", "This is a cool API");
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
    </Box>
  );
};
