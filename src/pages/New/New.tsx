import type { Tab } from "../../types/Tab";

type NewProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const New = ({ setCurrentTab }: NewProps) => {
  const progressPhase = () => {
    setCurrentTab("generating");
  };

  return (
    <div>
      New Game
      <button onClick={progressPhase}>Next Phase</button>
    </div>
  );
};

export default New;
