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
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignData } from "../Redux/user/action";
export const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user, loading } = useSelector((state) => state.userInfo);
  const { search } = useLocation();
  const RedirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = RedirectUrl ? RedirectUrl : "/";
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.email || !state.password || !state.name) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      dispatch(SignData(state, toast));
      navigate(redirect || "/");
    }
  };
  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);
  return (
    <>
      <Text
        fontSize={30}
        color="#f0c040"
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
        <Text fontSize={"2xl"} color="#FFFFFF" fontWeight="bold">
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
            colorScheme="yellow"
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
              <Link to={`/signin?redirect=${redirect}`}>
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
