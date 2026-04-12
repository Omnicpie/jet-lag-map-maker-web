import type { Tab } from "../../types/Tab";

type CompleteProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Complete = ({ setCurrentTab }: CompleteProps) => {
  const progressPhase = () => {
    setCurrentTab("new");
  };

  return (
    <div>
      Complete
      <button onClick={progressPhase}>Next Phase</button>
    </div>
  );
};

export default Complete;
