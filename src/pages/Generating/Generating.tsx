import { useCallback, useEffect, useMemo, useState } from "react";
import type { Tab } from "../../types/Tab";
import "./Generating.css";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import Railrover from "../../api/railrover/Railrover";

type GeneratingProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
  roverLink: string;
  setRoverLink: React.Dispatch<React.SetStateAction<string>>;
};

const Generating = ({
  setCurrentTab,
  roverLink,
  setRoverLink,
}: GeneratingProps) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [progress, setProgress] = useState(0);
  const [loading] = useState(true);

  const progressPhase = useCallback(() => {
    setCurrentTab("confirm");
  }, [setCurrentTab]);

  const cancel = () => {
    setRoverLink("");
    setCurrentTab("new");
  };

  useEffect(() => {
    if (!loading) {
      const int = setInterval(() => {
        setProgress((p) => p + 1);
      }, 50);

      return () => {
        clearInterval(int);
      };
    }
  }, [loading]);

  useEffect(() => {
    const abort = new AbortController();
    Railrover.get(roverLink, abort.signal)
      .then(console.log)
      .catch(console.error);

    return () => {
      abort.abort();
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      progressPhase();
    }
  }, [progress, progressPhase]);

  const loadingStatus = useMemo(() => {
    return "Phase 1 | 1/3: fetching info from " + roverLink;
  }, [roverLink]);

  return (
    <div className="generating-page">
      <h1>Generating...</h1>
      <div className="progress-bar">
        <div className="bar" style={{ width: `${progress}%` }} />
      </div>
      {loadingStatus}
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
