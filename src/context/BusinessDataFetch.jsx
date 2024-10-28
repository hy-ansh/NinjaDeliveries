import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";

import BusinessList from "../pages/BusinessList";

const BusinessDataFetch = () => {
  const [data, setData] = useState([]);
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "businessDetails"),
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
      {Loader === false && data.map((item) => <BusinessList item={item} />)}
    </div>
  );
};

export default BusinessDataFetch;
