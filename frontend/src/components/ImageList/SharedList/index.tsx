import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Searchbar from "../../Searchbar";

const SharedList = () => {
  const [term, setTerm] = useState<string>("");

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Searchbar term={term} setTerm={setTerm} />
    </Flex>
  );
};

export default SharedList;
