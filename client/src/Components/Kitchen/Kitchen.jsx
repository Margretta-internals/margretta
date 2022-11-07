import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Kitchen = () => {
  const [listInKitchen, setListInKitchen] = useState([]);

  useEffect(() => {
    const response = new Promise((resolve, reject) => {
      try {
        console.log("trying to resolve");
        resolve(axios.get("http://localhost:5000/kitchen"));
      } catch (err) {
        reject(`Sorry there is an issue on our end ${err}`);
      }
    });
    response.then((res) => {
      setListInKitchen(res?.data);
    });
  }, []);

  console.log("listInKitchen :", listInKitchen);

  return (
    <>
      <ol>
        {listInKitchen.length > 0 &&
          listInKitchen.map((el, i) => {
            if (i === 0)
              return <li key={el._id}>current order : {el.orderId}</li>;
            return <li key={el._id}>in queue item : {el.orderId}</li>;
          })}
      </ol>
    </>
  );
};

export default Kitchen;
