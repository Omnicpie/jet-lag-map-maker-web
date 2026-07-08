import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "./App.css";
import New from "../pages/New/New";
import Complete from "../pages/Complete/Complete";
import Generating from "../pages/Generating/Generating";
import Confirm from "../pages/Confirm/Confirm";
import useSettings from "../hooks/useSettings/useSettings";
import { BrowserRouter, Route, Routes } from "react-router";
import Unknown from "../pages/Unknown/Unknown";

const App = () => {
  const [roverLink, setRoverLink] = useState("");
  const { setSettings } = useSettings();

  useEffect(() => {
    if (!localStorage.getItem("settings")) {
      setSettings(
        JSON.stringify({
          gamesize: "l",
          units: "metric",
          lookupTool: "npm",
        }),
      );
    }
  }, [setSettings]);

  console.log("roverLink", roverLink);

  return (
    <BrowserRouter basename="jet-lag-map-maker-web">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<New setRoverLink={setRoverLink} />} />
          <Route path="new" element={<New setRoverLink={setRoverLink} />} />
          {roverLink ? (
            <>
              <Route
                path="generating"
                element={
                  <Generating
                    roverLink={roverLink}
                    setRoverLink={setRoverLink}
                  />
                }
              />
              <Route path="confirm" element={<Confirm />} />
              <Route path="complete" element={<Complete />} />
            </>
          ) : null}
          <Route path="*" element={<Unknown />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
