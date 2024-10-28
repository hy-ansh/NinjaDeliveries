import React, { useState } from "react";
import firebase from "firebase/app";

import {
  getFirestore,
  collection,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../context/Firebase";

export default function AddTransaction(value) {
  const [amount, setAmount] = useState();

  const [date, setDate] = useState(new Date());

  const [transaction, setTransaction] = useState({
    amount: parseFloat(amount),
    mode: "UPI",
    timestamp: date,
  });

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "riderDetails", value.value.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const Transactions = data.Transactions || [];

        Transactions.push(transaction);

        await updateDoc(docRef, {
          Transactions,
        });

        alert("Transaction Added");
      } else {
        console.log("Rider not found!");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div key={value.value.id}>
      <form className="row container mx-5 my-5  g-3">
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
            onChange={(e) =>
              setTransaction({ ...transaction, amount: e.target.valueAsNumber })
            }
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
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            type="submit"
          >
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
}
