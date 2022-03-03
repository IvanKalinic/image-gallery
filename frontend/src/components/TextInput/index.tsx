import { Flex, Input, InputProps } from "@chakra-ui/react";
import { FieldValues, DeepMap, FieldError } from "react-hook-form";
import { Search2Icon } from "@chakra-ui/icons";

interface Props extends InputProps {
  title: string;
  placeholder: string;
  registerName: string;
  register: any;
  errors: DeepMap<FieldValues, FieldError>;
}
const TextInput = (props: Props) => {
  const { title, placeholder, registerName, register, errors, ...styleProps } =
    props;

  return (
    <Flex>
      <Input
        placeholder={placeholder}
        {...register(registerName)}
        errors={errors}
        {...styleProps}
      />
      <Search2Icon cursor="pointer" ml="-5rem" />
    </Flex>
  );
};

export default TextInput;
