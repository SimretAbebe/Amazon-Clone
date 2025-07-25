import React, { useState, useContext } from "react";
import "./signup.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../component/DataProvider/DataProvider";
import { Type } from "../../Utility/action";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navState = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();
    const action = e.target.name;

    if (action === "signIn") {
      setLoading({ ...loading, signIn: true });
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        navigate(navState?.state?.redirect || "/");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading({ ...loading, signIn: false });
      }
    } else if (action === "signUp") {
      setLoading({ ...loading, signUp: true });
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        navigate(navState?.state?.redirect || "/");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading({ ...loading, signUp: false });
      }
    }
  };

  return (
    <section className="login">
      <Link to="/">
        <img
          src="https://www.shutterstock.com/image-vector/amazon-logo-icon-sign-art-260nw-2270561027.jpg"
          alt="Amazon Logo"
        />
      </Link>
      <div className="highdiv">
        <h1>Sign In</h1>
        {navState?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navState?.state?.msg}
          </small>
        )}

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signIn"
            className="sign"
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of use &
          sale. Please see your privacy Notice, our cookies and our Interest
          based Ads Notice.
        </p>

        <button
          type="button"
          onClick={authHandler}
          name="signUp"
          className="account"
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
