import { useCallback, useEffect, useState } from "react";
import type { Tab } from "../../types/Tab";
import "./Generating.css";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";

type GeneratingProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Generating = ({ setCurrentTab }: GeneratingProps) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
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
      <div className="progress-bar">
        <div className="bar" style={{ width: `${progress}%` }} />
      </div>
      {isMobile ? (
        <div className="lb-icon">
          <FontAwesomeIcon
            onClick={cancel}
            icon={faTimes}
            size="2xl"
            className="cancel-button"
          />
        </div>
      ) : (
        <Button label="Cancel" onClick={cancel} />
      )}
    </div>
  );
};

export default Generating;
