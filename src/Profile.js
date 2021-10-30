import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "./Error";

export const Profile = () => {
  const { user, setUserData, userError, isUserUpdating } = useMoralis();
  const [username, setUsername] = useState(user.attributes.username);
  const [email, setEmail] = useState(user.attributes.email);
  const [password, setPassword] = useState("");

  const handleSave = () => {
    setUserData({
      username,
      email,
      password: password.length > 0 ? password : undefined,
    });
  };
  return (
    <Box>
      <Stack spacing={3}>
        {userError && (
          <ErrorBox title="User change Failed" message={userError.message} />
        )}
        <Box>
          <Text>UserName</Text>

          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <Text>Email</Text>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Box>
        <Box>
          <Text>Password</Text>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button onClick={handleSave} isLoading={isUserUpdating}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};
