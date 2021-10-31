import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Button, Stack, Input, Text, Container } from "@chakra-ui/react";
import { ErrorBox } from "./Error";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {
  const { signup } = useMoralis();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Container className="mx-auto w-75">
      <Stack spacing={3}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button onClick={() => signup(email, password, email)}>Sign up</Button>
      </Stack>
    </Container>
  );
};

const Login = () => {
  const { login } = useMoralis();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Container className="mx-auto w-75">
      <Stack spacing={3}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button onClick={() => login(email, password)}>Login</Button>
      </Stack>
    </Container>
  );
};

export const Auth = () => {
  const { authenticate, isAuthenticating, authError } = useMoralis();

  return (
    <Stack spacing={6}>
      {authError && (
        <ErrorBox title="Authentication Failed" message={authError.message} />
      )}
      <Container className="mx-auto w-75 text-center">
        <Button isLoading={isAuthenticating} onClick={() => authenticate()}>
          Authenticate via Metamask
        </Button>
      </Container>
      <Text textAlign="center">
        <em>or</em>
      </Text>
      <SignUp />
      <Text textAlign="center">
        <em>or</em>
      </Text>
      <Login />
    </Stack>
  );
};
