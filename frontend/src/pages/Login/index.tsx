import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/loginSchema";
import { LoginForm } from "../../types";
import { LoginError, TextInput } from "../../components";
import { buttonColor, loginColors } from "../../global_styles";
import { LoginNavbarWrapper } from "../../styled-components";
import { useUser } from "../../context";
import { checkIsAllowed } from "../../util";

const defaultLoginValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [loginError, setLoginError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (loginForm: LoginForm) => {
    try {
      console.log(loginForm);
      if (checkIsAllowed(loginForm.email, loginForm.password)) {
        setUser({ email: loginForm.email, password: loginForm.password });
        navigate("/gallery");
      }
    } catch (err) {
      setLoginError(true);
    }
  };

  useEffect(() => {
    reset();
    setLoginError(false);
  }, []);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <LoginNavbarWrapper>
        <Image
          cursor="pointer"
          ml="10vw"
          height="4.5625rem"
          width="17rem"
          src={`${process.env.REACT_APP_CLIENT_PUBLIC_FOLDER}/agilno.png`}
        />
      </LoginNavbarWrapper>
      <form
        onSubmit={handleSubmit(handleLogin)}
        style={{ position: "relative", marginTop: "14.25rem" }}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          width="100%"
        >
          <Text
            fontSize="2.25rem"
            mb="0.375rem"
            fontWeight="900"
            lineHeight="3.375rem"
          >
            Log In
          </Text>
          <TextInput
            title="Email address"
            registerName="email"
            placeholder="Email"
            register={register}
            errors={errors}
            style={{
              border: "1px solid #A0AEC0",
              borderRadius: "0",
              width: "28.625rem",
              height: "3rem",
              color: `${loginColors}`,
            }}
          />
          <TextInput
            title="Password"
            registerName="password"
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
            style={{
              border: "1px solid #A0AEC0",
              borderRadius: "0",
              width: "28.625rem",
              height: "3rem",
              color: `${loginColors}`,
            }}
          />
          <Box height="1rem">
            {loginError && !errors.email && !errors.password && <LoginError />}
          </Box>
          <Button
            type="submit"
            color="white"
            fontWeight="500"
            mt="0.5rem"
            ml="0.5rem"
            backgroundColor={buttonColor}
            textTransform="uppercase"
            width="5.875rem"
            height="2.5rem"
            borderRadius="0"
            border="1px solid #A0AEC0"
          >
            Log in
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
