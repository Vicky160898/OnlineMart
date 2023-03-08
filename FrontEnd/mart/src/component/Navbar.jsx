import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  IconButton,
  Center,
  Button,
  Avatar,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../Redux/cart/action";
import SearchBox from "./SearchBox";
export const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    dispatch(Logout(toast, navigate));
  };
  return (
    <>
      <Box
        w="100%"
        h="75px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="#131921"
        fontSize={18}
        color="white"
      >
        <Link to="/">
          <Text fontSize={20} color="white" fontWeight="bold" ml={"20px"}>
            OnLineMart.in
          </Text>
        </Link>
        <SearchBox />
        <Link>
          {cart.cartitems.length > 0 && (
            <Badge bg="red" ml={"15px"}>
              {cart.cartitems.reduce((a, c) => a + c.quantity, 0)}
            </Badge>
          )}
          <BsCart2 size={"30px"} />
        </Link>
        <HStack spacing={{ base: "0", md: "6" }} mr={"40px"}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={"center"}>
            <Button
              onClick={toggleColorMode}
              background="#131921"
              mr="10px"
              border={"1px #CBCECA solid"}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                background="#131921"
                minW={0}
                ml="20px"
              >
                <Avatar
                  size={"md"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"} background="#131921">
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  <p>{user ? <p>{user.name}</p> : "Username"}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem background="#131921">
                  {user ? (
                    <Link to="/order">Order History</Link>
                  ) : (
                    "Your Order Details"
                  )}
                </MenuItem>
                <MenuItem background="#131921">Account Settings</MenuItem>
                <MenuItem background="#131921">
                  {user ? (
                    <Text onClick={handleLogout}>Logout</Text>
                  ) : (
                    <Link to="/signin">Login</Link>
                  )}
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Box>
    </>
  );
};
