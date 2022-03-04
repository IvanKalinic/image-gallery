import { SearchWrapper } from "../../styled-components";
import { Search2Icon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";

interface Props {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({ term, setTerm }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  return (
    <Flex alignItems="center" justifyContent="center">
      <SearchWrapper
        type="text"
        value={term}
        placeholder="Search images..."
        onChange={handleChange}
      />
      <Search2Icon
        position="relative"
        cursor="pointer"
        w="1.5rem"
        h="1.5rem"
        ml="-3rem"
        mt="3rem"
        color="#ABAFAE"
        css={{ ":hover": { color: "black" } }}
      />
    </Flex>
  );
};

export default Searchbar;
