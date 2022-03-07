import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { FieldValues, DeepMap, FieldError } from "react-hook-form";
import { Search2Icon } from "@chakra-ui/icons";

interface Props extends InputProps {
  title: string;
  placeholder: string;
  registerName: string;
  register: any;
  errors: DeepMap<FieldValues, FieldError>;
  search?: boolean;
  newPost?: boolean;
}
const TextInput = (props: Props) => {
  const {
    title,
    placeholder,
    registerName,
    register,
    errors,
    search,
    newPost,
    ...styleProps
  } = props;

  return (
    <FormControl isInvalid={errors[registerName]} mt={3}>
      <FormLabel
        fontWeight="500"
        fontSize="1rem"
        ml={newPost ? "12.5rem" : "0"}
        mt={newPost ? "1rem" : "0"}
      >
        {title}
      </FormLabel>
      <Input
        placeholder={placeholder}
        {...register(registerName)}
        errors={errors}
        {...styleProps}
      />
      {search && <Search2Icon cursor="pointer" ml="-5rem" />}
      <FormErrorMessage ml={newPost ? "12.5rem" : "0"}>
        {errors[registerName]?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
