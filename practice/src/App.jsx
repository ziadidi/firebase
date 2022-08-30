import React from "react";
import "./App.css";
import { auth, db } from "./Firebase/init";
import {collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc} from "firebase/firestore"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  async function updatePost() {
    const hardcodedId = "0kBF8XHV40j05Ki5nfzU"
    const postRef = doc(db, "posts", hardcodedId)
    const post = await getPostById(hardcodedId)
    const newPost = {
      ...post,
      title: "land a €500k job"
    }
     updateDoc(postRef, newPost)
   }

   function deletePost() {
    const hardcodedId = "0kBF8XHV40j05Ki5nfzU"
    const postRef = doc(db, "posts", hardcodedId)
    deleteDoc(postRef)
   }

  function createPost() {
    const post = {
      title: "fincacan fun",
      description: "quandrimodencon",
      uid: user.uid
    }
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const {docs} = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}))
    console.log(posts)
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id)
    const postSnap = await getDoc(postRef)
    return postSnap.data()
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", "1")
    )
    const {docs} = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()))
  }

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
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get all posts</button>
      <button onClick={getPostById}>Get Posts by Id</button>
      <button onClick={getPostByUid}>Get Posts by Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
