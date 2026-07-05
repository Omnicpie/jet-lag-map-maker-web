import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";

const Unknown = () => {
  const navigate = useNavigate();

  return (
    <div>
      404!
      <Button
        label="Return Home"
        onClick={() => {
          navigate("/new");
        }}
      />
    </div>
  );
};

export default Unknown;
