import { useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`sidebar${open ? "" : " collapse"}`}>
      <div className={`lb-container`} onClick={() => setOpen((p) => !p)}>
        <div className="lb-icon">
          <FontAwesomeIcon
            icon={open ? faCaretLeft : faCaretRight}
            size={"lg"}
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
