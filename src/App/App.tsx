import { useMemo, useState } from "react";
import Layout from "../components/Layout/Layout";
import "./App.css";
import New from "../pages/New/New";
import type { Tab } from "../types/Tab";
import Complete from "../pages/Complete/Complete";
import Generating from "../pages/Generating/Generating";
import Confirm from "../pages/Confirm/Confirm";

const App = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("confirm");

  const tabContant = useMemo(() => {
    switch (currentTab) {
      case "new":
        return <New setCurrentTab={setCurrentTab} />;
      case "generating":
        return <Generating setCurrentTab={setCurrentTab} />;
      case "confirm":
        return <Confirm setCurrentTab={setCurrentTab} />;
      case "complete":
        return <Complete />;
      default:
        return <New setCurrentTab={setCurrentTab} />;
    }
  }, [currentTab]);

  return <Layout currentTab={currentTab}>{tabContant}</Layout>;
};

export default App;
