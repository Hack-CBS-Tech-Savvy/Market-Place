import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "./Error";
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

export const UserAPI = () => {
  const { user, setUserData, userError, isUserUpdating, Moralis } =
    useMoralis();

  const getData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const query = new Moralis.Query(API_DATABASE);
    query.equalTo("User", Moralis.User.current());
    query.find().then((results) => {
      setApiData(results);
    });
  };
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Stack spacing={3}>
        {userError && (
          <ErrorBox title="User change Failed" message={userError.message} />
        )}
        <Button onClick={getData} isLoading={isUserUpdating}>
          {" "}
          Update API Data
        </Button>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>All your listed APIs</TableCaption>
          <Thead>
            <Tr>
              <Th>API Name</Th>
              <Th isTruncated>API Description</Th>
              <Th>Link to the Docs</Th>
            </Tr>
          </Thead>
          <Tbody>
            {apiData &&
              apiData.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.get("Name")}</Td>
                    <Td>{item.get("Description")}</Td>
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
    </Box>
  );
};
