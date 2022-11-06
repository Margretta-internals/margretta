import React, { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [startSimulation, setstartSimulation] = useState(false);
  const [numberOfCustomers, setnumberOfCustomers] = useState(10);

  useEffect(() => {
    if (startSimulation) {
      setInterval(() => {
        if (numberOfCustomers > 0) setnumberOfCustomers(numberOfCustomers - 1);
      }, 10 * 1000);
    }
  }, [startSimulation, numberOfCustomers]);
  return (
    <>
      <div>{numberOfCustomers}</div>
      <button onClick={() => setstartSimulation(true)}>Click</button>
    </>
  );
};

export default Home;
