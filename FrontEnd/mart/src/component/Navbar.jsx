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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <>
      <Box
        w="100%"
        h="60px"
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

        <Link to="/login">Login</Link>
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
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem background="#131921">Your Servers</MenuItem>
                <MenuItem background="#131921">Account Settings</MenuItem>
                <MenuItem background="#131921">Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Box>
    </>
  );
};
