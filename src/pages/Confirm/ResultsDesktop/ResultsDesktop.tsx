import { createPortal } from "react-dom";
import type { StationResult } from "../../../types/StationResult";
import "./ResultsDesktop.css";
import { type Dispatch, type SetStateAction } from "react";
import ModalContent from "./ModalContent/ModalContent";
import Button from "../../../components/Button/Button";

type ResultsDesktopProps = {
  items: StationResult[];
  open?: StationResult;
  setOpen: Dispatch<SetStateAction<StationResult | undefined>>;
};

const ResultsDesktop = ({ items, setOpen, open }: ResultsDesktopProps) => {
  const displayModal = (item: StationResult) => {
    setOpen(item);
  };

  return (
    <>
      <table className="results-desktop">
        <thead>
          <tr>
            <th>Lookup Name</th>
            <th>Matched Station</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>
                [{item.found.code}] {item.found.name}
              </td>
              <td>{item.found.lat}</td>
              <td>{item.found.lon}</td>
              <td>
                <Button className="action" label="Edit" onClick={() => {}} />
                <Button
                  className="action"
                  label="View"
                  onClick={() => displayModal(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default ResultsDesktop;
