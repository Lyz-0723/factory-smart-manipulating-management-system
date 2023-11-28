import React from "react";
import "./Machine.css";

const MachinePage = () => {
  return (
    <div class="container">
      <h1>機台管理系統</h1>

      <div class="machine-selector">
        <label for="machineSelect">選擇機台：</label>
        <select id="machineSelect" onChange={() => {}}>
          <option value="machineA">機台A</option>
          <option value="machineB">機台B</option>
          <option value="machineC">機台C</option>
        </select>
      </div>

      <div class="machine-image-container">
        {/* <img id="machineImage" src="https://th.bing.com/th/id/R.0bac653b846f00d67a63634c09a6f51a?rik=wuFGmQ5jEB8ayg&riu=http%3a%2f%2fwww.yangann.com.tw%2fupload%2fproduct%2f1805151525240000001.jpg&ehk=7V8sRgbyRFP4ayIecIzSWJcI6AenZpUoXjf13vMJ3qI%3d&risl=&pid=ImgRaw&r=0" alt="機台圖片" class="machine-image"> */}
        {/* <img src="emergency_stop_button.png" alt="緊急停止" class="emergency-stop-button" onClick="emergencyStop()"> */}
        <div class="status-management-link" onClick={() => {}}>
          狀態管理
        </div>
      </div>

      <div class="machine-status-table">
        <h2>機台狀態</h2>
        <table>
          <thead>
            <tr>
              <th>機台</th>
              <th>序列號</th>
              <th>使用情況</th>
              <th>位置</th>
              <th>狀態</th>
              <th>腳本</th>
              <th>條件</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="statusTableBody"></tbody>
        </table>
      </div>

      <div class="added-machines">
        <h2>新增機台列表</h2>
        <button class="toggle-button" onClick={() => {}}>
          顯示/隱藏列表
        </button>
        <table id="addedMachinesTable">
          <thead>
            <tr>
              <th>機台名稱</th>
              <th>新增日期</th>
              <th>原因</th>
            </tr>
          </thead>
          <tbody id="addedMachinesTableBody"></tbody>
        </table>
      </div>

      <div class="navigation"></div>
    </div>
  );
};

export default MachinePage;
