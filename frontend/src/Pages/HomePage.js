import React from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        textAlign="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily={"work sans"} color={"black"}>Zola</Text>
      </Box>

      <Box bg="white" w="100%" p={4} borderRadius="lg"  color="black" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded" >
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Đăng nhập</Tab>
            <Tab width={"50%"}>Đăng ký</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <Login/> 
            </TabPanel>
            <TabPanel>
             <Signup/> 
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
