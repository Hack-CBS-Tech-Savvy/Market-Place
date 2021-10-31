import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "./Error";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
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
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>API Name</Th>
              <Th isTruncated>API Description</Th>
              <Th>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            {apiData &&
              apiData.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Stack>
    </Box>
  );
};
