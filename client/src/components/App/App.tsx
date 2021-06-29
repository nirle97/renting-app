import "./App.css";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogged, authSelectors } from "../../store/authSlice";
import { userSelectors } from "../../store/userSlice";
import network from "../../utils/network";
import NavBar from "../Navbar/NavBar";
import Home from "../Home/Home";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import UploadApt from "../UploadApt/UploadApt";
import UserLikes from "../Likes/UserLikes";
import HomeOwner from "../HomeOwner/HomeOwner";

function App() {
  const { isLogged } = useSelector(authSelectors);
  const { user } = useSelector(userSelectors);
  
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
      ) : user.isOwner? 
        <>
        <NavBar />
        <UploadApt />
        <Switch>
            <Route exact path="/" component={HomeOwner} />
          </Switch>
        </>
      :(
        <>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/likes" component={UserLikes} />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
