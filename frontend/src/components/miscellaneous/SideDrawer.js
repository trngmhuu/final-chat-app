import React, { useState } from 'react';
import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button } from "@chakra-ui/button";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Avatar } from "@chakra-ui/avatar";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();

  const { user } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="white"
        width="100%"
        padding="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip 
          label="Nhập tên người dùng để tìm kiếm" 
          hasArrow 
          placement='bottom-end'
        >
          <Button variant="ghost">
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Tìm kiếm người dùng
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Zola
        </Text>
        <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize="2xl" m={1}/>
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
          <MenuButton 
            as={Button} 
            rightIcon={<ChevronDownIcon/>}
          >
            <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>Xem hồ sơ</MenuItem>
            </ProfileModal>
            
            <MenuDivider/>
            
            <MenuItem onClick={logoutHandler}>Đăng xuất</MenuItem>
          </MenuList>
        </Menu>
        </div>
      </Box>
      <Drawer placement='left'>
        
      </Drawer>
    </>
  )
}

export default SideDrawer
