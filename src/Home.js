import { NavLink, Router, Route, Switch } from 'react-router-dom';
import APIForm from "./components/Form";

export const Home = () => {
 

  return (
    <div>
       <NavLink to="/form">
       Add API
     </NavLink>

     <Switch>
       <Route path="/form" exact><APIForm/></Route>
     </Switch>
    </div>
  );
};
