import { Container, Heading, Flex, Spacer, Avatar } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { Auth } from "./Auth";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Home } from "./Home";
import { Profile } from "./Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { AddAPI } from "./addAPI";
import { UserAPI } from "./UserAPI";
function App() {
  const { isAuthenticated, logout, user, isAuthUndefined } = useMoralis();

  return (
    <main>
      <div>
        <div className="logout-btn">
          <Spacer ml={2} />
          {isAuthenticated && (
            <Link to="/profile">
              <Avatar name={user ? user.attributes.username : "NEW"} />{" "}
            </Link>
          )}
          &nbsp;&nbsp;
          {isAuthUndefined && <Heading>Loading...</Heading>}
          {/* <Spacer/> */}
          {isAuthenticated && ( //if isAuthenticated  is true then show logout button
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </div>

      <Flex my={6}></Flex>

      <div mb={3} className="h3 fw-bold title-height">
        <div className="heading">
          <div className="home-btn">
            <Link to="/">Home</Link>
          </div>
          <div className="text-center">
            Welcome to the Market Place,{" "}
            {user ? user.attributes.username : "Authenticate Please"}
          </div>
        </div>
      </div>
      {/*  */}
      {isAuthenticated ? (
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/addAPI" exact>
            <AddAPI />
          </Route>
          <Route path="/getUserAPI" exact>
            <UserAPI />
          </Route>
        </Switch>
      ) : (
        <>
          {!isAuthUndefined && <Redirect to="/"></Redirect>}
          <Auth />
        </>
      )}
    </main>
  );
}

export default App;
