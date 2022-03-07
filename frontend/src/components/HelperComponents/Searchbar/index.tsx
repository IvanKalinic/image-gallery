import { SearchWrapper } from "../../../styled-components";
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
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="sticky"
      zIndex="1000"
    >
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
        right="-10.5rem"
        top="-4.2rem"
        color="#ABAFAE"
        css={{ ":hover": { color: "black" } }}
      />
    </Flex>
  );
};

export default Searchbar;
