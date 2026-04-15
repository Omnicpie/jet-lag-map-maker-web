import type { StationResult } from "../../../types/StationResult";
import "./ResultsMobile.css";

type ResultsMobileProps = {
  items: StationResult[];
};

const ResultsMobile = ({ items }: ResultsMobileProps) => {
  return (
    <div className="results-mobile">
      {items.map((item) => (
        <div key={item.name} className="result">
          <p>{item.name}</p>
          <p>
            Matched:{" "}
            <b>
              [{item.found.code}] {item.found.name}
            </b>
          </p>
          <span className="coords">
            <span>Lat: {item.found.lat}</span>
            <span>Long:{item.found.lon}</span>
          </span>
          <div className="actions">
            <button>Edit</button>
            <button>View</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsMobile;
