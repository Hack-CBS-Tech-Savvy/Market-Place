import { Center, Container, Heading, Flex, Spacer, Avatar } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { Auth } from "./Auth";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Home } from "./Home";
import { Profile } from "./Profile";

function App() {
  const { isAuthenticated, logout, user, isAuthUndefined } = useMoralis();

  return (
    <Container>
       <Center color="white"fontWeight="bold" fontSize="48px">
        API Marketplace
        </Center>
      <Flex my={6}>
        <Link to="/">
        </Link>
        <Spacer ml={2} />
        {isAuthenticated && (
          <Link to="/profile">
            <Avatar name={user ? user.attributes.username : "NEW"} />{" "}
          </Link>
        )}
        {isAuthUndefined && <Heading>Loading...</Heading>}
         <Spacer ml={2}/> 
        {isAuthenticated && ( //if isAuthenticated  is true then show logout button
          <button onClick={logout}>Logout</button>
        )}
      </Flex>

      <Center mb={6} fontSize="25px">
        Welcome to the Market Place,<br/>{" "}
        {user ? user.attributes.username : "Authenticate Please"}
      </Center>
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
