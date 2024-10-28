import { useState } from "react";
import { firestore } from "../context/Firebase";

import { collection, addDoc } from "firebase/firestore";

//import TimeInput from './TimeInput'

export default function BusinessRegistration() {
  const [Name, setName] = useState("");
  const [Type, setType] = useState("Choose...");
  const [Number, setNumber] = useState("");
  const [In, setIn] = useState("");
  const [Out, setOut] = useState("");

  const InChange = (e) => {
    setIn(e.target.value);
  };
  const OutChange = (e) => {
    setOut(e.target.value);
  };
  let isAvailable;
  const handleSelect = (e) => {
    setType(e.target.value);
  };
  const Av = () => {
    isAvailable = true;
  };
  const NotAv = () => {
    isAvailable = false;
  };
  const show = (e) => {
    e.preventDefault();
    console.log(Name);
    console.log(Type);
    console.log(Number);
    console.log(In);
    console.log(Out);
    console.log(isAvailable);
    handleSubmit();
  };
  const handleSubmit = async () => {
    alert("Success");
    return await addDoc(collection(firestore, "businessDetails"), {
      name: Name,
      type: Type,
      phoneNumber: Number,
      inTime: In,
      outTime: Out,
      isAvailable: isAvailable,
    });
  };

  return (
    <div>
      <form className="row g-3 mt-5 mx-5 container">
        <div className="col-md-4">
          <label htmlFor="validationDefault01" className="form-label">
            Business Name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault01"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="validationDefault04" className="form-label">
            Business Type
          </label>
          <select
            value={Type}
            onChange={handleSelect}
            className="form-select"
            id="validationDefault04"
            required
          >
            <option disabled>Choose...</option>
            <option value="Grocery">Grocery</option>
            <option value="Medicine">Medicine</option>
            <option value="Store">Store</option>
            <option value="Vegetable Store">Vegetable Store</option>
            <option value="Restaurant">Restaurant</option>
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationDefault02" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            className="form-control"
            value={Number}
            onChange={(e) => setNumber(e.target.value)}
            id="validationDefault02"
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationDefault02" className="form-label">
            In Time
          </label>
          <input
            type="time"
            className="form-control"
            id="validationDefault02"
            value={In}
            onChange={InChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationDefault02" className="form-label">
            Out Time
          </label>
          <input
            type="time"
            value={Out}
            onChange={OutChange}
            className="form-control"
            id="validationDefault02"
            required
          />
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            onChange={Av}
            name="exampleRadios"
            id="exampleRadios1"
            value="option1"
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            Available
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            onChange={NotAv}
            id="exampleRadios2"
            value="option2"
          />
          <label className="form-check-label" htmlFor="exampleRadios2">
            Not Available
          </label>
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary"
            onClick={show}
            type="submit"
            disabled={
              Name.length === 0 ||
              Type === "Choose..." ||
              Number.length === 0 ||
              In.length === 0 ||
              Out.length === 0 ||
              isAvailable === null
            }
          >
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
}
