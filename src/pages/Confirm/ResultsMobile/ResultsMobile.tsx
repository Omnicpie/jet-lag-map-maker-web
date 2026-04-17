import type { Dispatch, SetStateAction } from "react";
import type { StationResult } from "../../../types/StationResult";
import "./ResultsMobile.css";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent/ModalContent";
import Button from "../../../components/Button/Button";

type ResultsMobileProps = {
  items: StationResult[];
  open?: StationResult;
  setOpen: Dispatch<SetStateAction<StationResult | undefined>>;
};

const ResultsMobile = ({ items, setOpen, open }: ResultsMobileProps) => {
  const displayModal = (item: StationResult) => {
    setOpen(item);
  };
  return (
    <>
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
              <Button label="Edit" onClick={() => {}} />
              <Button label="View" onClick={() => displayModal(item)} />
            </div>
          </div>
        ))}
      </div>
      {open
        ? createPortal(
            <ModalContent station={open} setOpen={setOpen} />,
            //@ts-expect-error portal root could in theory be null, but never will be
            document.getElementById("portal-root"),
          )
        : null}
    </>
  );
};

export default ResultsMobile;
