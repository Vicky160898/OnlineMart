import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!state.email || !state.password || !state.name) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      let body = {
        name: state.name,
        email: state.email,
        password: state.password,
      };

      const data = await axios.post(
        "http://localhost:8080/api/login/signup",
        body,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (data.status) {
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Text
        fontSize={40}
        color="#0A0103"
        fontWeight="bold"
        textAlign={"center"}
        mt={"20px"}
      >
       OnLineMart.in
      </Text>
      <Box
        textAlign={"center"}
        w={"30%"}
        m="auto"
        mt={"40px"}
        p={5}
        borderRadius="15px"
        boxShadow=" rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <Text fontSize={"2xl"} color="#0A0103" fontWeight="bold">
          Sign up
        </Text>
        <VStack spacing="5px">
          <FormControl id="name" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="name"
              type="text"
              placeholder="Enter Full Name"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={hanldeChange}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={handleSubmit}
          >
            {loading === true ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
              />
            ) : (
              "Signup"
            )}
          </Button>
          <Stack pt={6}>
            <Text align={"center"} display="flex" flexDirection={"row"}>
              Already have an account ?
              <Link to="/login">
                <Text color={"blue"} fontWeight="bold">
                  Sign in
                </Text>
              </Link>
            </Text>
          </Stack>
        </VStack>
      </Box>
    </>
  );
};
