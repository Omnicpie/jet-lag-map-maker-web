import type { Tab } from "../../types/Tab";

type ConfirmProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Confirm = ({ setCurrentTab }: ConfirmProps) => {
  const progressPhase = () => {
    setCurrentTab("complete");
  };

  return (
    <div>
      Confirm
      <button onClick={progressPhase}>Next Phase</button>
    </div>
  );
};

export default Confirm;
