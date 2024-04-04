import React, { useState } from "react";
import { VStack, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleClick = () => setShow(!show);
    const submitHandler = async () => {
      setLoading(true);
      if (!email || !password) {
        toast({
          title: "Vui lòng nhập đầy đủ thông tin",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const {data} = await axios.post("/api/user/login", {email, password}, config);

        toast({
          title: "Đăng nhập thành công",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/chats");
      }
      catch(error) {
        toast({
          title: "Đã có lỗi xảy ra",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });
        setLoading(false);
      }
    }
  
  
    return (
      <VStack spacing={"5px"} color="black">
        {/* Email */}
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Nhập email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        {/* password */}
        <FormControl id="password" isRequired>
          <FormLabel>Mật khẩu</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                {show ? "Ẩn" : "Hiện"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
  
        <Button
          colorScheme="blue"
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
        Đăng nhập
        </Button>

        <Button
        variant={"solid"} colorScheme="red" width={"100%"} onClick={() =>{
            setEmail("default@gmail.com");
            setPassword("1231233");
        }}
        >
          Truy cập với quyền Guest
        </Button>
      </VStack>
    );
  };

export default Login
