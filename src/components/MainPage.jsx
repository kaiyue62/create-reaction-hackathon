import * as React from "react";
import { Menu } from "@fluentui/react-northstar";
import { Camera } from "./Camera";
import { CustomEmojisComponent } from "./CustomEmojis";
import { useLocation } from "react-router-dom";
import "./MainPage.css";

const items = [
  {
    key: "custom_emojis",
    content: "Custom Emojis",
  },
  {
    key: "shoot_emoji",
    content: "Shoot emoji",
  },
];

export const MainPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const messageId = query.get("messageId");
  const userId = query.get("userId");
  const convId = query.get("convId");

  const [activeIndex, setActiveIndex] = React.useState(0);
  const onActiveIndexChange = React.useCallback((i, j) => {
    setActiveIndex(j.activeIndex);
  });

  return (
    <div id="main-page" style={{ height: "100%" }}>
      <Menu
        defaultActiveIndex={0}
        items={items}
        underlined
        primary
        onActiveIndexChange={onActiveIndexChange}
      />
      {activeIndex === 0 && (
        <CustomEmojisComponent
          messageId={messageId}
          userId={userId}
          convId={convId}
        />
      )}
      {activeIndex === 1 && <Camera userId={userId} />}
    </div>
  );
};
