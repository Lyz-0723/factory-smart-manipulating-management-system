import React from "react";
import "./MachineStatus.css";
const MachineStatus = () => {
  return (
    <>
      <header>
        <h1>狀態管理</h1>
      </header>

      <section>
        <div class="machine-status">
          <h2>Machine 1</h2>
          <p>Status: Running</p>
          <p>Temperature: 50°C</p>
        </div>

        {/* <!-- Add more machine statuses as needed --> */}
      </section>
    </>
  );
};

export default MachineStatus;
