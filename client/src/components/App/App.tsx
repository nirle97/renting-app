import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelectors } from "../../store/authSlice";
import NavBar from "../Navbar/NavBar";
import Home from "../Home/Home";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import UploadApt from "../UploadApt/UploadApt";

function App() {
  // const isLogged = true;

  const { isLogged } = useSelector(authSelectors);

  return (
    <div className="App">
      {!isLogged ? (
        <>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
          </Switch>
        </>
      ) : (
        <>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <UploadApt />
        </>
      )}
    </div>
  );
}

export default App;
