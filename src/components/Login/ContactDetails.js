import React, { useRef, useContext, useEffect } from "react";
import AuthContex from "../../Context/CreateContext";

import classes from "./ContactDetail.module.css";
const ContactDetails = () => {
  const ctx = useContext(AuthContex);
  const enteredName = useRef();
  const enteredUrl = useRef();
  useEffect(() => {
    const getuserData = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBTThTF2bZBEybWGDxdJF9j6pEtGVzXUrY",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: localStorage.getItem("id"),
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message);
        } else {
          enteredName.current.value = data.users[0].displayName;
          enteredUrl.current.value = data.users[0].photoUrl;
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getuserData();
  }, []);
  const ContactDetailsHandle = async (event) => {
    event.preventDefault();
    const obj = {
      idToken: localStorage.getItem("id"),
      displayName: enteredName.current.value,
      photoUrl: enteredUrl.current.value,
      returnSecureToken: true,
    };
    if (obj.displayName === "" && obj.photoUrl === " ") {
      return;
    }
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBTThTF2bZBEybWGDxdJF9j6pEtGVzXUrY",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      } else {
        console.log("User has successfullyupdated.", data);

        alert("User has successfully updated,");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes["ContactDetails"]}>
      <header className={classes["ContactDetails-header"]}>
        <p>some text</p>
      </header>
      <div className={classes["ContactDetails-from-container"]}>
        <form
          className={classes["ContactDetails-form"]}
          onSubmit={ContactDetailsHandle}
        >
          <h3>Contact Details</h3>
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" ref={enteredName}></input>
          <label htmlFor="url"> Enter image URL</label>
          <input type="text" id="imageURL" ref={enteredUrl}></input>
          <button type="submit">update</button>
        </form>
      </div>
    </div>
  );
};
export default ContactDetails;