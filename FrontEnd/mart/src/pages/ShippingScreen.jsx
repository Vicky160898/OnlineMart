import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShippingItme } from "../Redux/cart/action";

export default function ShippingScreen() {
  const { cart } = useSelector((ste) => ste.cart);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: cart.shippingAddress.name || "",
    address: cart.shippingAddress.address || "",
    city: cart.shippingAddress.city || "",
    country: cart.shippingAddress.country || "",
    code: cart.shippingAddress.code || "",
  });
  useEffect(() => {
    if (!user) {
      navigate("/signin?redirect=/shipping");
    }
  }, [user, navigate]);

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ShippingItme(state));
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>Shipping Address</Helmet>
      <Text fontSize={"2xl"} color="#FFFFFF" fontWeight="bold">
        Shipping Address
      </Text>
      <Box
        textAlign={"center"}
        w={"30%"}
        m="auto"
        mt={"20px"}
        p={10}
        borderRadius="15px"
        boxShadow=" rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
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
          <FormControl id="address" isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              type="address"
              placeholder="Enter address"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="city" isRequired>
            <FormLabel>City</FormLabel>
            <Input
              name="city"
              type="text"
              placeholder="Enter City"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="code" isRequired>
            <FormLabel>Postal Code</FormLabel>
            <Input
              name="code"
              type="number"
              placeholder="Enter Postal Code"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl id="country" isRequired>
            <FormLabel>country</FormLabel>
            <Input
              name="country"
              type="text"
              placeholder="Enter Country"
              onChange={hanldeChange}
            />
          </FormControl>
          <Button
            colorScheme="yellow"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </VStack>
      </Box>
    </div>
  );
}
