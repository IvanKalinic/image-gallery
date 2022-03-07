import { Link } from "react-router-dom";
import { UniversalWrapper } from "../../../styled-components";

const Error = () => {
  return (
    <UniversalWrapper>
      <div>
        <h1>404</h1>
        <h3>Sorry,the page you tried cannot be found</h3>
        <Link to="/">Back home</Link>
      </div>
    </UniversalWrapper>
  );
};

export default Error;
