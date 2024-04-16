import React, { useState } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { IconButton } from "@chakra-ui/button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleDelete = (messageId) => {
    console.log("Xóa tin nhắn:", messageId);
  };

  const handleReply = (messageId) => {
    console.log("Trả lời tin nhắn:", messageId);
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex", position: "relative" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "10px 20px",
                maxWidth: "75%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                fontSize: "16px"
              }}
              onClick={() => setSelectedMessage(m._id)}
            >
              {m.content}
            </span>
            {selectedMessage === m._id && m.sender._id === user._id && (
              <span style={{ position: "relative" }}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<BiDotsVerticalRounded />}
                    variant="outline"
                    size="xs"
                    position="relative"
                    right="5px"
                    top="50%"
                    transform="translateY(-50%)"
                  />
                  <MenuList position="relative">
                    <MenuItem onClick={() => handleDelete(m._id)}>Xóa</MenuItem>
                    <MenuItem onClick={() => handleReply(m._id)}>
                      Trả lời
                    </MenuItem>
                  </MenuList>
                </Menu>
              </span>
            )}
            {selectedMessage === m._id && m.sender._id !== user._id && (
              <span style={{ position: "relative" }}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<BiDotsVerticalRounded />}
                    variant="outline"
                    size="xs"
                    position="absolute"
                    left="5px"
                    top="50%"
                    transform="translateY(-50%)"
                  />
                  <MenuList>
                    <MenuItem onClick={() => handleReply(m._id)}>
                      Trả lời
                    </MenuItem>
                  </MenuList>
                </Menu>
              </span>
            )}
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
