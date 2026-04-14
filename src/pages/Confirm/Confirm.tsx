import { useState } from "react";
import type { Tab } from "../../types/Tab";
import "./Confirm.css";

type ConfirmProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Confirm = ({ setCurrentTab }: ConfirmProps) => {
  const [failedLookups] = useState([
    { name: "Moston" },
    { name: "Newton-le-Willows" },
    { name: "Walsden" },
  ]);
  const [stations] = useState([
    {
      name: "Liverpool Lime Street",
      found: {
        code: "LIV",
        name: "Liverpool Lime Street",
        lat: 59.78123,
        lon: -2.775,
      },
    },
    {
      name: "Manchester Victoria",
      found: {
        code: "MCV",
        name: "Manchester Victoria",
        lat: 59.78234,
        lon: -2.73,
      },
    },
    {
      name: "Liverpool Central",
      found: {
        code: "LPC",
        name: "Liverpool Central",
        lat: 59.78126,
        lon: -2.78,
      },
    },
  ]);

  const progressPhase = () => {
    setCurrentTab("complete");
  };

  return (
    <div className="confirm-page">
      <div className="header">
        <div className="left-side">
          <h2>Results</h2>
          <span>360/365 Stations encoded</span>
        </div>

        <button onClick={progressPhase}>Confirm</button>
      </div>
      <div className="failed-results">
        <h3>Failed Lookups</h3>
        <ul>
          {failedLookups.map((item) => (
            <li key={item.name}>
              {item.name} <button>Add</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="results">
        <h3>Stations</h3>
        <table>
          <thead>
            <th>Lookup Name</th>
            <th>Matched Station</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {stations.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>
                  [{item.found.code}] {item.found.name}
                </td>
                <td>{item.found.lat}</td>
                <td>{item.found.lon}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Confirm;
