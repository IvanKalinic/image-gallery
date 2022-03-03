import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { FieldValues, DeepMap, FieldError } from "react-hook-form";

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
    <FormControl isInvalid={errors[registerName]} mt={3}>
      <FormLabel fontWeight="500" fontSize="1rem">
        {title}
      </FormLabel>
      <Input
        placeholder={placeholder}
        {...register(registerName)}
        errors={errors}
        {...styleProps}
        _placeholder={{ color: "white" }}
      />
      <FormErrorMessage>{errors[registerName]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
