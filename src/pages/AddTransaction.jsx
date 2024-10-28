import React, { useState } from "react";
import firebase from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../context/Firebase";

export default function AddTransaction(value) {
  const [amount, setAmount] = useState();

  const [date, setDate] = useState(new Date());

  const AddObjectToArray = () => {
    const [objectToAdd, setObjectToAdd] = useState({
      amount: parseFloat(amount),
      mode: "UPI",
      TimeStamp: date,
    });

    const collectionName = "riderDetails";
    const documentId = value.value.id;

    const addObjectToArray = async () => {
      try {
        await db
          .collection(collectionName)
          .doc(documentId)
          .update({
            objectsArray: firebase.firestore.FieldValue.arrayUnion(objectToAdd),
          });
        console.log("Object added successfully!");
      } catch (error) {
        console.error("Error adding object:", error);
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      addObjectToArray();
    };
  };
  return (
    <div key={value.value.id}>
      <form className="row container my-5 g-3">
        <div className="col-md-12">
          <label htmlFor="validationDefault02" className="form-label"></label>
          <input
            type="text"
            disabled
            className="form-control"
            id="validationDefault02"
            value={value.value.username}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationDefault01" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="validationDefault01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationDefault02" className="form-label">
            Mode
          </label>
          <input
            type="text"
            disabled
            className="form-control"
            id="validationDefault02"
            value="UPI"
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationDefault02" className="form-label">
            TimeStamp
          </label>
          <input
            type="text"
            disabled
            className="form-control"
            id="validationDefault02"
            value={date}
            required
          />
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary"
            onClick={handleSubmit()}
            type="submit"
          >
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
}
