import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { AuthContext } from "../context/authContext";
import { handleLogout } from "../Firebase";

const Dashboard = () => {
  const { user } = React.useContext(AuthContext);
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  console.log(user.email);
  return (
    <Box bg={bgColor} minHeight="100vh" p={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" color={textColor}>
          Welcome to Your Dashboard {user.email}
        </Heading>
        <Text fontSize="xl" color={textColor}>
          This is a simple dashboard component created with Chakra UI.
        </Text>
        <Box bg="white" p={6} borderRadius="md" boxShadow="md">
          <Text color="gray.600">
            You can add more components and functionality to this dashboard as
            needed.
          </Text>
        </Box>
        <Button onClick={async () => await handleLogout()}>Logout</Button>
      </VStack>
    </Box>
  );
};

export default Dashboard;
