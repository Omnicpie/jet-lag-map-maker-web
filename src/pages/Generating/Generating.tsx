import type { Tab } from "../../types/Tab";

type GeneratingProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Generating = ({ setCurrentTab }: GeneratingProps) => {
  const progressPhase = () => {
    setCurrentTab("confirm");
  };

  return (
    <div>
      Generating
      <button onClick={progressPhase}>Next Phase</button>
    </div>
  );
};

export default Generating;
