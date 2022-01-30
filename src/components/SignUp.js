import React, { useState } from "react";
import { Link } from "react-router-dom";
import APICommunicator from "../services/adapter";

const SignUp = (props) => {
  const initialState = {
    name: "",
    password: "",
    password_confirmation: "",
    is_manager: false,
    team: "",
    phone_number: "",
    image_url: "",
  };

  const [stateItem, setStateItem] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (stateItem.password !== stateItem.password_confirmation) {
      alert("Passwords must match");
    } else {
      const adapter = new APICommunicator();
      const copiedState = { ...stateItem };
      const { password_confirmation, ...newUser } = copiedState;
      adapter.createUser(newUser).then((user) => props.setUser(user));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    console.log("is this happening", name);
    const value = name === "is_manager" ? e.target.checked : e.target.value;
    console.log("value?", value);
    setStateItem({
      ...stateItem,
      [name]: value,
    });
  };

  return (
    <div className="user-div">
      <div className="user-auth">
        <form onSubmit={handleSubmit}>
          <ul className="user-outer">
            <li>
              <label name="name">Username*</label>
              <input
                type="text"
                name="name"
                value={stateItem.name}
                onChange={handleChange}
              />
            </li>
            <li>
              <label name="password">Password*</label>
              <input
                type="password"
                name="password"
                value={stateItem.password}
                onChange={handleChange}
              />
            </li>
            <li>
              <label name="password_confirmation">Confirm Password*</label>
              <input
                type="password"
                name="password_confirmation"
                value={stateItem.password_confirmation}
                onChange={handleChange}
              />
            </li>
            <li>
              <label name="is_manager">Manager?</label>
              <input
                type="checkbox"
                name="is_manager"
                value={stateItem.is_manager}
                onChange={handleChange}
              />
            </li>
            <li>
              <label name="phone_number">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={stateItem.phone_number}
                onChange={handleChange}
              />
            </li>
            <li>
              <button type="submit" name="submit">
                Sign Up
              </button>
            </li>
          </ul>
        </form>
        <p>
          Already have an account? Log in <Link to="/login">here</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
