import type { Tab } from "../../types/Tab";
import "./New.css";

type NewProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const New = ({ setCurrentTab }: NewProps) => {
  const progressPhase = () => {
    setCurrentTab("generating");
  };

  return (
    <div className="new-page">
      <div className="logo">
        <h3>Jet Lag: The Game Hide &amp; Seek</h3>
        <h1>Map Maker</h1>
      </div>
      <input />
      <button onClick={progressPhase}>Generate</button>
    </div>
  );
};

export default New;
