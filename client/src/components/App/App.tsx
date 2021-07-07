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
import HomeOwner from "../HomeOwner/HomeOwner/HomeOwner";
import Chat from "../Chat/Chat";

function App() {
  const { isLogged } = useSelector(authSelectors);
  const { user } = useSelector(userSelectors);

  const dispatch = useDispatch();

  async function validateToken() {
    try {
      const { status } = await network.post("/auth/tokenValidate");
      if (status === 200) {
        dispatch(setIsLogged({ isLogged: true }));
      }
    } catch (e) {
      dispatch(setIsLogged({ isLogged: false }));
    }
  }
  // useEffect(() => {
  //   validateToken();
  // }, []);

  return (
    <div className="App">
      {!isLogged ? (
        <>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
          </Switch>
        </>
      ) : user.isOwner ? (
        <>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeOwner} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/upload-apt" component={UploadApt} />
          </Switch>
        </>
      ) : (
        <>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/likes" component={UserLikes} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
