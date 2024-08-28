/**
 * SortName Component
 *
 * This component fetches and displays a list of user data that can be sorted based on different attributes.
 * It uses Chakra UI for styling and responsive design.
 */

import React, { useState } from "react";
import useFetchname from "./hooks/useFetchname";
import {
  Container,
  Box,
  VStack,
  HStack,
  Select,
  Heading,
  Spinner,
  useColorMode,
  useColorModeValue,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./sortname.css";

export default function SortName() {
  // Custom hook to fetch and manage user data
  const { names, fetchNames, loading } = useFetchname();

  // State to manage the selected sorting option
  const [selectedOption, setSelectedOption] = useState("id");

  // Chakra UI hooks for color mode and responsive styling
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");
  const cardHeaderBgColor = useColorModeValue("gray.100", "gray.600");
  const cardFooterBgColor = useColorModeValue("gray.50", "gray.700");

  // Toast hook for displaying notifications
  const toast = useToast();

  // Available sorting options
  const options = [
    "id",
    "name",
    "username",
    "email",
    "address.street",
    "address.suite",
    "address.city",
    "address.zipcode",
    "address.geo.lat",
    "address.geo.lng",
    "phone",
    "website",
    "company.name",
    "company.catchPhrase",
    "company.bs",
  ];

  // Memoized URL for fetching user data
  const url = React.useMemo(
    () => "https://jsonplaceholder.typicode.com/users",
    []
  );

  // Effect to fetch names when component mounts
  React.useEffect(() => {
    fetchNames(url);
  }, [fetchNames, url]);

  // Memoized sorted names based on the selected option
  const sortedNames = React.useMemo(() => {
    return [...names].sort((a, b) => {
      const getNestedValue = (obj, path) => {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
      };
      const aValue = getNestedValue(a, selectedOption);
      const bValue = getNestedValue(b, selectedOption);
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }, [names, selectedOption]);

  // Display loading spinner while data is being fetched
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg={bgColor}
      >
        <Spinner size="xl" color={textColor} />
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      bg={bgColor}
      color={textColor}
      className="sort-name-container"
    >
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header section with title and color mode toggle */}
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              Sorting Name
            </Heading>
            <Button
              onClick={toggleColorMode}
              colorScheme={colorMode === "light" ? "purple" : "orange"}
            >
              Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
            </Button>
          </Box>

          {/* Sorting options dropdown */}
          <HStack spacing={4} justifyContent="center">
            <Select
              placeholder="Select option"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              width={["100%", "50%"]}
              bg={cardBgColor}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </HStack>

          {/* Grid of user cards */}
          <SimpleGrid columns={[1, null, 3]} spacing={4}>
            {sortedNames.map((name) => (
              <CopyToClipboard
                key={name.id}
                text={JSON.stringify(name, null, 2)}
                onCopy={() =>
                  // Toast notification when card content is copied
                  toast({
                    title: "Copied to clipboard",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    colorScheme: "purple",
                  })
                }
              >
                <Card
                  width="100%"
                  bg={cardBgColor}
                  shadow="md"
                  borderWidth="1px"
                  borderColor={cardBorderColor}
                  borderRadius="lg"
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    shadow: "lg",
                    cursor: "pointer",
                  }}
                >
                  <CardHeader bg={cardHeaderBgColor} py={3} px={4}>
                    <Heading size="md" color={textColor}>
                      {name.name}
                    </Heading>
                  </CardHeader>
                  <CardBody py={4} px={4}>
                    <Text fontSize="sm" color={textColor} whiteSpace="pre-wrap">
                      {JSON.stringify(name, null, 2)}
                    </Text>
                  </CardBody>
                  <CardFooter
                    bg={cardFooterBgColor}
                    py={3}
                    px={4}
                    borderTop="1px"
                    borderColor={cardBorderColor}
                  >
                    <Text fontWeight="bold" color={textColor}>
                      {selectedOption}:{" "}
                      {selectedOption
                        .split(".")
                        .reduce((acc, part) => acc && acc[part], name)}
                    </Text>
                  </CardFooter>
                </Card>
              </CopyToClipboard>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
