import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import SDK from "../../../chatSDK";
import { useNavigate } from "react-router-dom";

export default function ChatLogin() {
  const [userIdentity, setUserIdentity] = useState("");
  const navigate = useNavigate();
let userName ="";
let password ="";
  const onSubmit = async(event)=>{
    event.preventDefault();
    const userNameForm = userIdentity
    const response = await SDK.register(userNameForm);
  
    const connectUser = {
      userName :response.data.username,
      password :response.data.password,  
    }
      
    
      
    localStorage.setItem("login", JSON.stringify(connectUser));
    navigate("/chat")
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={onSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="text" 
                value={userIdentity}
                onChange={(e) => setUserIdentity(e.target.value)} />
              </FormControl>
              <Stack spacing={10} pt={"20px"}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
