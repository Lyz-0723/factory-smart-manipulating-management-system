import React, { useContext, useEffect, useState } from "react";
import "./ProductionLine.css";
import { AdminContext } from "../Base";
import {
  get_machine_in_pl,
  modify_production_line,
  get_all_pl,
  add_new_production_line,
  get_production_line_status,
  add_new_machine,
} from "../../../requests/Admin/data";
import Loading from "../../Common/Loading";
import { AppContext } from "../../../App";

const ProductionLinePage = () => {
  const { setMode } = useContext(AppContext);
  const { allProductionLine, setAllProductionLine, allItem } =
    useContext(AdminContext);
  const [allMachine, setAllMachine] = useState(undefined);
  const [modify, setModify] = useState(undefined);
  const [addNew, setAddNew] = useState(false);
  const [addNewMachine, setAddNewMachine] = useState(undefined);
  const [productionLineStatus, setProductionLineStatus] = useState(undefined);

  useEffect(() => {
    const get_all_machines = async () => {
      const promises = allProductionLine.map(async (pl) => {
        const machines = await get_machine_in_pl(pl.pl_id);
        const all_state = await get_production_line_status();
        setProductionLineStatus(all_state);
        return { pl_id: pl.pl_id, machines };
      });

      const all_machines = await Promise.all(promises);
      setAllMachine(all_machines);
    };

    get_all_machines();
    // eslint-disable-next-line
  }, []);

  const confirm_modify_production_line = async () => {
    const pl_name = document.getElementById("production-line-name").value;
    const pl_description = document.getElementById(
      "production-line-description"
    ).value;
    if (await modify_production_line(modify, pl_name, pl_description)) {
      alert("Process success!");
      const all_pl = await get_all_pl();
      if (all_pl) setAllProductionLine(all_pl);
      setModify(undefined);
      return;
    }
    alert("Process failed!");
    setModify(undefined);
  };

  const add_new_pl = async () => {
    const pl_name = document.getElementById("new-production-line-name").value;
    const pl_description = document.getElementById(
      "new-production-line-description"
    ).value;
    const item_id = document.getElementById("new-production-line-item").value;
    if (await add_new_production_line(pl_name, pl_description, item_id)) {
      alert("Process success!");
      const new_pl = await get_all_pl();
      if (new_pl) setAllProductionLine(new_pl);
      setAllMachine([
        ...allMachine,
        { pl_id: new_pl[new_pl.length - 1].pl_id, machines: [] },
      ]);
      setAddNew(false);
      return;
    }
    alert("Process failed!");
    setAddNew(false);
  };

  const add_new_machine_in_pl = async () => {
    const pl_id = addNewMachine;
    const serial_number = document.getElementById(
      "add-new-machine-serial-number"
    ).value;
    const machine_usage = document.getElementById(
      "add-new-machine-usage"
    ).value;
    const position = document.getElementById("add-new-machine-position").value;

    if (
      pl_id &&
      serial_number &&
      machine_usage &&
      position &&
      (await add_new_machine(pl_id, serial_number, machine_usage, position))
    ) {
      alert("Process success!");
      const new_machine = await get_machine_in_pl(pl_id);
      if (new_machine) {
        setAllMachine(() => {
          return allMachine.map((machineSet) => {
            if (machineSet.pl_id === pl_id) {
              return { pl_id, machines: new_machine };
            }
            return machineSet;
          });
        });
      }
      setAddNewMachine(undefined);
      return;
    }
    alert("Process failed!");
    setAddNewMachine(undefined);
    return;
  };

  // const delete_specific_production_line = async (pl_id) => {
  //   if (await delete_production_line(pl_id)) {
  //     alert("Delete process success!");
  //   }
  // };

  return (
    <div className="pl-containerr">
      <header>
        <h1>機台管理</h1>
      </header>

      {allMachine && (
        <section>
          {allProductionLine &&
            allProductionLine.map((pl) => (
              <div className="production-line" key={pl.pl_id}>
                {modify !== pl.pl_id && (
                  <div key={pl.pl_id}>
                    <div
                      className="production-line-title"
                      style={{ display: "flex" }}
                    >
                      {pl.pl_name}{" "}
                      <button style={{ marginLeft: "10px" }}>X</button>
                    </div>

                    <b>
                      <div className="production-line-description">
                        {pl.pl_description}
                      </div>
                      <div className="production-line-description">
                        Status :{" "}
                        {
                          productionLineStatus.find(
                            (plStatus) => plStatus.status_id === pl.status
                          ).status
                        }
                      </div>
                    </b>
                  </div>
                )}
                {modify === pl.pl_id && (
                  <div>
                    <input
                      className="production-line-title"
                      defaultValue={pl.pl_name}
                      id="production-line-name"
                    />
                    <input
                      className="production-line-description"
                      defaultValue={pl.pl_description}
                      id="production-line-description"
                    />
                  </div>
                )}

                {allMachine
                  .find((machineSet) => machineSet.pl_id === pl.pl_id)
                  .machines.map((machine) => (
                    <div className="machine" onClick={() => setMode(55)}>
                      <div className="machine-preview">
                        <p>Serial Number: {machine.serial_number}</p>
                        <p>Usage: {machine.machine_usage}</p>
                        <p>Position: {machine.position}</p>
                        <p>Status: {machine.status}</p>
                      </div>
                      <div onClick={() => {}}>
                        Machine #{machine.serial_number} id :{" "}
                        {machine.machine_id}
                      </div>
                    </div>
                  ))}

                {addNewMachine === pl.pl_id && (
                  <div className="machine">
                    <input
                      className="machine-add-function-input"
                      id="add-new-machine-serial-number"
                      placeholder="New Machine Serial Number"
                    />{" "}
                    <input
                      className="machine-add-function-input"
                      id="add-new-machine-usage"
                      placeholder="New Machine Usage"
                    />{" "}
                    <input
                      className="machine-add-function-input"
                      type="number"
                      id="add-new-machine-position"
                      placeholder="New Machine position"
                      min={1}
                    />
                  </div>
                )}

                {!addNewMachine && (
                  <button
                    className="add-machine-btn"
                    onClick={() => setAddNewMachine(pl.pl_id)}
                  >
                    新增機台
                  </button>
                )}
                {addNewMachine === pl.pl_id && (
                  <>
                    <button
                      className="machine-add-function"
                      onClick={() => add_new_machine_in_pl()}
                    >
                      確認
                    </button>{" "}
                    <button
                      className="machine-add-function"
                      onClick={() => setAddNewMachine(undefined)}
                    >
                      取消
                    </button>
                  </>
                )}

                {!modify && (
                  <button
                    className="modify-production-line"
                    onClick={() => setModify(pl.pl_id)}
                  >
                    修改
                  </button>
                )}
                {modify === pl.pl_id && (
                  <button
                    className="confirm-modify-production-line"
                    onClick={() => confirm_modify_production_line()}
                  >
                    確認
                  </button>
                )}
              </div>
            ))}
          {addNew && (
            <div className="production-line">
              <div>
                New Production Line name :
                <input
                  className="production-line-title"
                  id="new-production-line-name"
                />
              </div>
              <div>
                New Production Line description :
                <input
                  className="production-line-description"
                  id="new-production-line-description"
                />
              </div>
              Select Item :
              <select
                name="new-production-line-item"
                id="new-production-line-item"
              >
                {allItem.map((item) => (
                  <option value={item.item_id}>{item.item_name}</option>
                ))}
              </select>
              <button onClick={() => add_new_pl()}>確認</button>
              <button onClick={() => setAddNew(false)}>取消</button>
            </div>
          )}

          <button
            className="add-production-line-btn"
            onClick={() => setAddNew(true)}
          >
            新增生產線
          </button>

          <div id="addMachineForm" className="confirmation-dialog">
            <h2>新增機台</h2>
            {/* <!-- Add form elements for new machine details --> */}
            <button onClick={() => {}}>確認新增機台</button>
            <button onClick={() => {}}>取消</button>
          </div>
        </section>
      )}

      {!allMachine && <Loading />}
    </div>
  );
};

export default ProductionLinePage;
