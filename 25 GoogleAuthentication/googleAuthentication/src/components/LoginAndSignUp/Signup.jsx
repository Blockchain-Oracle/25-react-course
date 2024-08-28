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
import { FaMoon, FaGoogle } from "react-icons/fa";
import * as Yup from "yup";
import {
  handleSignUpWithEmailAndPassword,
  handleSignUpWithGoogle,
} from "../../Firebase";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await handleSignUpWithEmailAndPassword(values.email, values.password);
        console.log("User created successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error creating user:", error);
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
      colorScheme={colorMode}
    >
      <Button
        colorScheme={colorMode}
        onClick={toggleColorMode}
        leftIcon={<Icon as={FaMoon} />}
      >
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
      <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="lg" width="400px">
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center" color={textColor}>
            Sign Up
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
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                }
              >
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <FormErrorMessage>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full">
                Sign Up
              </Button>
            </VStack>
          </form>
          <Text textAlign="center">Or</Text>
          <Button
            leftIcon={<Icon as={FaGoogle} />}
            colorScheme="red"
            variant="outline"
            width="full"
            onClick={async () => {
              try {
                await handleSignUpWithGoogle();
                navigate("/dashboard");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Sign up with Google
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
