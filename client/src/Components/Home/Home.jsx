import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [startSimulation, setstartSimulation] = useState(false);
  const [numberOfCustomers, setnumberOfCustomers] = useState(10);
  const [customer, setCustomer] = useState({
    id: 0,
  });

  const deleteDetails = () => {
    const response = new Promise((resolve, reject) => {
      try {
        console.log("trying to resolve");
        resolve(axios.post("http://localhost:5000/stop"));
      } catch (err) {
        reject(`Sorry there is an issue on our end ${err}`);
      }
    });
    console.log(response);
  };

  const handleStopSimulation = () => {
    setstartSimulation(false);
    setnumberOfCustomers(10);
    deleteDetails();
  };

  useEffect(() => {
    if (startSimulation) {
      let myTimer = setInterval(() => {
        if (numberOfCustomers > 0) {
          setnumberOfCustomers(numberOfCustomers - 1);
          setCustomer({
            id: customer.id + 1,
          });
        } else setstartSimulation(false);
      }, 3 * 1000);
      myTimer;
      return () => clearInterval(myTimer);
    }
  }, [startSimulation, numberOfCustomers]);

  const postDetails = () => {
    const response = new Promise((resolve, reject) => {
      try {
        console.log("trying to resolve");
        resolve(
          axios.post("http://localhost:5000/create-order", {
            orderId: customer.id,
          })
        );
      } catch (err) {
        reject(`Sorry there is an issue on our end ${err}`);
      }
    });
    console.log(response);
  };

  useEffect(() => {
    if (customer.id) postDetails();
  }, [customer]);

  return (
    <>
      <div>{numberOfCustomers}</div>
      <button onClick={() => setstartSimulation(true)}>Start Simulation</button>
      <button onClick={handleStopSimulation}>Stop Simulation</button>
    </>
  );
};

export default Home;
