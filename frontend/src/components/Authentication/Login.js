import React, { useState } from "react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";


const Login = () => {
    
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    const handleClick = () => setShow(!show);
    const submitHandler =() =>{
      
    }
  
  
    return (
      <VStack spacing={"5px"} color="black">
        {/* Email */}
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        {/* password */}
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
  
        <Button
          colorScheme="blue"
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
        Login
        </Button>

        <Button
        variant={"solid"} colorScheme="red" width={"100%"} onClick={() =>{
            setEmail("chidai@gmail.com");
            setPassword("1231233");
        }}
        >
        Get Guest User Credentdetais
        </Button>
      </VStack>
    );
  };

export default Login
