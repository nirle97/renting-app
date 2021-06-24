import "./App.css";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogged, authSelectors } from "../../store/authSlice";
import network from "../../utils/network";
import NavBar from "../Navbar/NavBar";
import Home from "../Home/Home";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import UploadApt from "../UploadApt/UploadApt";

function App() {
  const { isLogged } = useSelector(authSelectors);
  const dispatch = useDispatch();

  async function validateToken() {
    const { status } = await network.post("/auth/tokenValidate");
    if (status === 200) {
      dispatch(setIsLogged({ isLogged: true }));
    }
  }
  useEffect(() => {
    validateToken();
  }, []);

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
          <UploadApt />
          <Switch>
          <Route exact path="/" component={Home} />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
