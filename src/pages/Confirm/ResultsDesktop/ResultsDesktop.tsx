import type { StationResult } from "../../../types/StationResult";
import "./ResultsDesktop.css";

type ResultsDesktopProps = {
  items: StationResult[];
};

const ResultsDesktop = ({ items }: ResultsDesktopProps) => {
  return (
    <table className="results-desktop">
      <thead>
        <th>Lookup Name</th>
        <th>Matched Station</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {items.map((item) => (
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
  );
};

export default ResultsDesktop;
