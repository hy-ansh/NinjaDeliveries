import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";
import RiderList from "../pages/RiderList";

const RiderDataFetch = () => {
  const [data, setData] = useState([]);
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "riderDetails"),
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(newData);
        setLoader(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {Loader === false && data.map((item) => <RiderList item={item} />)}
    </div>
  );
};

export default RiderDataFetch;
