import { useCallback, useEffect, useState } from "react";
import type { Tab } from "../../types/Tab";
import "./Generating.css";

type GeneratingProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Generating = ({ setCurrentTab }: GeneratingProps) => {
  const [progress, setProgress] = useState(0);

  const progressPhase = useCallback(() => {
    setCurrentTab("confirm");
  }, [setCurrentTab]);

  const cancel = () => {
    setCurrentTab("new");
  };

  useEffect(() => {
    const int = setInterval(() => {
      setProgress((p) => p + 1);
    }, 150);

    return () => {
      clearInterval(int);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      progressPhase();
    }
  }, [progress, progressPhase]);

  return (
    <div className="generating-page">
      <h1>Generating...</h1>
      <div className="progress-bar">{progress}%</div>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
};

export default Generating;
