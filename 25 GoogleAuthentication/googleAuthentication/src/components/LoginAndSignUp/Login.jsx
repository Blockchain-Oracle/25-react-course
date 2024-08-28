import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";
import {
  handleLoginWithGoogle,
  loginWithEmailAndPassword,
} from "../../Firebase";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await loginWithEmailAndPassword(values.email, values.password);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      className="flex justify-center items-center h-screen"
      bg={useColorModeValue("gray.50", "gray.800")}
      //   colorscheme={colorMode}
    >
      <Button
        // colorscheme={colorMode}
        onClick={toggleColorMode}
        leftIcon={<Icon as={FaMoon} />}
      >
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
      <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="lg" width="400px">
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center" color={textColor}>
            Login
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onFocus={() => formik.setFieldTouched({ email: false })}
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.password && formik.touched.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onFocus={() => formik.setFieldTouched({ password: false })}
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button type="submit" width="full">
                Login
              </Button>
            </VStack>
          </form>
          <Text textAlign="center">Or</Text>
          <Button
            leftIcon={<Icon as={FaGoogle} />}
            variant="outline"
            width="full"
            onClick={async () => {
              try {
                await handleLoginWithGoogle();
                navigate("/dashboard");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Sign in with Google
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
