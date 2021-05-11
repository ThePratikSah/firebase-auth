// Your web app's Firebase configuration
const firebaseConfig = {
  //  your firebase config code here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const signup = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      document.getElementById("loader").style.display = "none";
      document.getElementById("userData").style.display = "block";
      document.getElementById("signupDiv").style.display = "none";

      let user = userCredential.user;
      console.log(user);

      user = firebase.auth().currentUser;

      user
        .sendEmailVerification()
        .then(function () {
          alert("Please check your email for verification link");
        })
        .catch(function (error) {
          // An error happened.
          alert("Failed to send the verification email");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      document.getElementById("loader").style.display = "none";
    });
};

const signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      document.getElementById("userData").style.display = "block";
      document.getElementById("signupDiv").style.display = "none";
      document.getElementById("loader").style.display = "none";

      let user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      document.getElementById("signupDiv").style.display = "block";
      document.getElementById("userData").style.display = "none";
    })
    .catch((error) => {
      // An error happened.
    });
};

const btn = document.getElementById("btnSignup");
const btnSignIn = document.getElementById("btnSignIn");
const btnSignOut = document.getElementById("signOut");

btn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  document.getElementById("loader").style.display = "block";
  signup(email, password);
});

btnSignIn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  document.getElementById("loader").style.display = "block";
  signIn(email, password);
});

btnSignOut.addEventListener("click", () => signOut());
