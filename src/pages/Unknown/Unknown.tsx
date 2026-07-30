import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import "./Unknown.css";

const Unknown = () => {
  const navigate = useNavigate();

  return (
    <div className="unknown-page">
      <div className="logo">
        <Logo />
        <h3>Jet Lag: The Game Hide &amp; Seek</h3>
        <h1>Map Maker</h1>
      </div>
      <div className="infobox">
        <span>This page cannot be found!</span>
      </div>
      <Button label="Return Home" onClick={() => navigate("/new")} />
      <span className="version">version {__APP_VERSION__}</span>
    </div>
  );
};

export default Unknown;
