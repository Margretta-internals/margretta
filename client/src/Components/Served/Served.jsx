import React, { useEffect, useState } from "react";
import axios from "axios";

const Served = () => {
  const [listInServed, setListInServed] = useState([]);

  useEffect(() => {
    const response = new Promise((resolve, reject) => {
      try {
        console.log("trying to resolve");
        resolve(axios.get("http://localhost:5000/served"));
      } catch (err) {
        reject(`Sorry there is an issue on our end ${err}`);
      }
    });
    console.log(response);
  }, []);

  return (
    <>
      <ol>
        {listInServed.map((el, i) => {
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

export default Served;
