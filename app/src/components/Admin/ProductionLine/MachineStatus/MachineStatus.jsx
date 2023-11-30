import React from "react";

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

        <div class="machine-status">
          <h2>Machine 2</h2>
          <p>Status: Idle</p>
          <p>Temperature: 30°C</p>
        </div>

        {/* <!-- Add more machine statuses as needed --> */}
      </section>
    </>
  );
};

export default MachineStatus;
