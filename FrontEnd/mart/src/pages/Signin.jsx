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
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginData } from "../Redux/user/action";
export const Signin = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const toast = useToast();
  const { user, loading } = useSelector((state) => state.userInfo);
  //console.log(user);
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  //let token = JSON.parse(localStorage.getItem("User")) || [];
  const { search } = useLocation();
  const RedirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = RedirectUrl ? RedirectUrl : "/";
  //here posting the login request...
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.email || !state.password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      dispatch(LoginData(state));
      navigate(redirect || "/");
      return;
      // } else {
      //   toast({
      //     title: "Invalid Credentials! OR Singup First!",
      //     description: error.response.data.message,
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "top",
      //   });
      // }

      //here storing the importance info of User..
    } catch (error) {
      toast({
        title: "Invalid Credentials! OR Singup First!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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
        fontSize={20}
        color="#f0c040"
        fontWeight="bold"
        textAlign={"center"}
        mt={"20px"}
      >
        Admin Credential email:-admin@gmail.com && Password:-12345
      </Text>
      <Text
        fontSize={40}
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
          Sign in
        </Text>
        <VStack spacing="5px">
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
              "Sign in"
            )}
          </Button>
          <Stack pt={6}>
            <Text align={"center"} display="flex" flexDirection={"row"}>
              Don't have an account ?
              <Link to={`/signun?redirect=${redirect}`}>
                <Text color={"blue"} fontWeight="bold">
                  Sign up
                </Text>
              </Link>
            </Text>
          </Stack>
        </VStack>
      </Box>
    </>
  );
};
