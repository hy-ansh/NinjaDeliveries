import React, { useState } from "react";
import BusinessListUpdate from "./BusinessListUpdate";

function DataBlock({ item }) {
  const [Editbox, setEditbox] = useState(false);

  return (
    <div key={item.id}>
      {/* <div className="container mt-4"> */}
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {item.name}
          <button
            onClick={() => {
              if (Editbox === false) {
                setEditbox(true);
              } else {
                setEditbox(false);
              }
            }}
            className="btn btn-primary"
          >
            More Information
          </button>
        </li>
      </ul>
      {/* </div> */}
      {Editbox === true && (
        <BusinessListUpdate item={item} setEditbox={setEditbox} />
      )}
    </div>
  );
}
export default DataBlock;
