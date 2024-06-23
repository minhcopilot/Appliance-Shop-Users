import { Badge, Button, Card } from "antd";
import React from "react";
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
        text={message.sender === "employee" ? "Nhân viên" : "Khách hàng"}
        placement={placement}
        style={{ margin: 10 }}
      >
        <Card size="small" className="break-words">
          <p
            style={
              message.sender === "customer"
                ? { marginLeft: 90 }
                : { marginRight: 80 }
            }
            dir={message.sender === "employee" ? "" : "rtl"}
          >
            {message.type === "text" && message.content}
            {message.type === "image" && (
              <img src={message.content} alt="image" />
            )}
            {message.type === ("product" || "order") && (
              <Button onClick={() => {}}>Go to {message.type}</Button>
            )}
          </p>
        </Card>
      </Badge.Ribbon>
    </>
  );
}
