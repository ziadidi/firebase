import React from "react";
import "./App.css";
import { auth } from "./Firebase/init";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user)
      if (user) {
        setUser(user)
      }
    })
  }, [])

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
    .then(({user}) => {
      console.log(user)
       setUser(user)
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  function logout() {
    signOut(auth)
    setUser({})
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'loading...' : user.email}
    </div>
  );
}

export default App;
