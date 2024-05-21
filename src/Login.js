// import React from 'react'
// import "./Login.css"
// import {auth ,googleProvider} from './firebase';
import {signInWithPopup} from "firebase/auth";
// import { useStateValue } from './StateProvider';
// import { actionTypes } from './reducer';

// const Login = () => {
//   // const [value,setValue] =useState('');
//   const [{} , dispatch] =useStateValue();

//   const handleClick=()=>{
//     signInWithPopup(auth,googleProvider).then((data)=>{
//         console.log(data)   
//       dispatch({
//             type:actionTypes.SET_USER,
//             user :data.user,
//           });
//     })
//     .catch((err)=>alert(err.message))
//   }
//   return (
//     <div className="login">
//       <div className ="login__container">
//         <img src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png"
//         />
//         <div className="login__text">
//             <h2>Sign in to Whatsapp</h2>
//         </div>

//         <button type="submit" onClick={handleClick}>
//             Sign In With Google
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Login

import React from "react";

import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth,provider).then((data)=>{
              console.log(data)   
            dispatch({
                  type:actionTypes.SET_USER,
                  user :data.user,
                });
      
        // dispatch({
        //   type: actionTypes.SET_SESSION,
        //   uid: result.user.uid,
        //   displayName: result.user.displayName,
        //   photoURL: result.user.photoURL,
        // });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
          alt="whatsapp"
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <button onClick={signIn}>Sign In with Google</button>
      </div>
    </div>
  );
}

export default Login;