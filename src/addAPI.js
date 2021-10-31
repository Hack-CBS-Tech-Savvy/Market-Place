import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "./Error";

export const AddAPI = () => {
  const { user, setUserData, userError, isUserUpdating, Moralis } =
    useMoralis();
  const [apiName, setAPIname] = useState("");
  const [apiDescription, setAPIDescription] = useState("");
  const [apiLink, setAPILink] = useState("");

  const sendData = () => {
    const API_DATABASE = Moralis.Object.extend("API_DATABASE");
    const apiDatabase = new API_DATABASE();
    apiDatabase.set("User", Moralis.User.current());
    apiDatabase.set("Name", apiName);
    apiDatabase.set("Description", apiDescription);
    apiDatabase.set("URL", apiLink);
    apiDatabase.save().then(() => {
      console.log("Successfully saved.");
    });
  };

  return (
    <Box>
      <Stack spacing={3}>
        {userError && (
          <ErrorBox title="User change Failed" message={userError.message} />
        )}
        <Box>
          <Text>API Name</Text>

          <Input value={apiName} onChange={(e) => setAPIname(e.target.value)} />
        </Box>
        <Box>
          <Text>API Description</Text>
          <Input
            value={apiDescription}
            onChange={(e) => setAPIDescription(e.target.value)}
          />
        </Box>
        <Box>
          <Text>API Documentation Link</Text>
          <Input value={apiLink} onChange={(e) => setAPILink(e.target.value)} />
        </Box>
        <Button onClick={sendData} isLoading={isUserUpdating}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};
