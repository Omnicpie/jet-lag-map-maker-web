import { useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretLeft,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import Settings from "./Settings/Settings";

const icons = {
  mobile: { open: faTimes, closed: faBars },
  desk: { open: faCaretLeft, closed: faCaretRight },
};

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [open, setOpen] = useState(!isMobile);

  const type = isMobile ? "mobile" : "desk";
  const state = open ? "open" : "closed";

  return (
    <div className={`sidebar${open ? "" : " collapse"}`}>
      {open ? <Settings /> : null}
      <div className={`lb-container`} onClick={() => setOpen((p) => !p)}>
        <div className="lb-icon">
          <FontAwesomeIcon
            icon={icons[type][state]}
            size={isMobile ? "2xl" : "lg"}
            title={"Collapse"}
            className=""
          />
        </div>
        <div className={`lb-text${open ? "" : " collapse"}`}>Collapse</div>
      </div>
    </div>
  );
};

export default Sidebar;
