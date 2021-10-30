import { Container, Heading, Flex, Spacer, Avatar } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { Auth } from "./Auth";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Home } from "./Home";
import { Profile } from "./Profile";

function App() {
  const { isAuthenticated, logout, user, isAuthUndefined } = useMoralis();

  return (
    <Container>
      <Flex my={6}>
        <Link to="/">
          <Heading>Home</Heading>
        </Link>
        <Spacer ml={2} />
        {isAuthenticated && (
          <Link to="/profile">
            <Avatar name={user ? user.attributes.username : "NEW"} />{" "}
          </Link>
        )}
        {isAuthUndefined && <Heading>Loading...</Heading>}
        {/* <Spacer/> */}
        {isAuthenticated && ( //if isAuthenticated  is true then show logout button
          <button onClick={logout}>Logout</button>
        )}
      </Flex>

      <Heading mb={6}>
        Welcome to the Market Place,{" "}
        {user ? user.attributes.username : "Authenticate Please"}
      </Heading>
      {isAuthenticated ? (
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
        </Switch>
      ) : (
        <>
          {!isAuthUndefined && <Redirect to="/"></Redirect>}
          <Auth />
        </>
      )}
    </Container>
  );
}

export default App;
