import { Badge, Button, Card, List, Modal } from "antd";
import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import ReplyTo from "./ReplyTo";

type MessageProps = {
  type: string;
  replyTo?: string;
  sender: string;
  status: string;
  content: string;
  editHistory?: string[];
};

type RibbonPlacement = "start" | "end";

export default function Message({ message }: { message: MessageProps }) {
  let placement: RibbonPlacement =
    message.sender === "employee" ? "end" : "start";
  // const navigate = useNavigate();

  return (
    <>
      {/* {message.replyTo && <ReplyTo id={message.replyTo} />} */}
      <Badge.Ribbon
        text={message.sender}
        placement={placement}
        style={{ margin: 10 }}
      >
        <Card
          size="small"
          actions={[
            <Modal title="Edit History">
              <List children={message.editHistory} />
            </Modal>,
          ]}
        >
          <div style={{ marginLeft: 80 }}>
            {message.type === "text" && message.content}
            {message.type === "image" && (
              <img src={message.content} alt="image" />
            )}
            {message.type === ("product" || "order") && (
              <Button onClick={() => {}}>Go to {message.type}</Button>
            )}
          </div>
        </Card>
      </Badge.Ribbon>
    </>
  );
}
