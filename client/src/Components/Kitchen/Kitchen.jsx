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
    console.log(response);
  }, []);

  return (
    <>
      <ol key={el.id}>
        {listInKitchen.map((el, i) => {
          if (i === 0) {
            <li>current item : ${el.id}</li>;
          } else {
            <li>in queue item : ${el.id}</li>;
          }
        })}
      </ol>
    </>
  );
};

export default Kitchen;
