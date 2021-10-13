import * as React from "react";
import {
  Grid,
  Image,
  Button,
  gridHorizontalBehavior,
  AddIcon,
  Text,
} from "@fluentui/react-northstar";
import { getAllMockEmojis } from "./MockData";
import { getCustomImages, selectCustomImage } from "./data";

const imageButtonStyles = {
  minWidth: "150px",
  maxWidth: "150px",
  height: "150px",
  padding: "0",
  margin: "5px",
};

const renderImageButtons = (allEmojis, onEmojiClick) => {
  // Todo: get emoji from server
  // const allEmojis = await getCustomImages("");//getAllMockEmojis();
  const onClick = (emoji) => {
    onEmojiClick(emoji);
  };
  return (
    allEmojis &&
    allEmojis.map((emoji) => (
      <Button
        key={emoji.id}
        styles={imageButtonStyles}
        title={emoji.name}
        onClick={()=>onClick(emoji)}
      >
        <Image fluid src={emoji.src} />
      </Button>
    ))
  );
};

const renderAddEmojiButton = () => {
  const fileInputRef = React.useRef(null);

  const onAddButtonClick = React.useCallback(() => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  });

  const fileUploadInputChange = React.useCallback((e) => {
    // Todo: get upload file and update to server
    // uploaded file: e.target.value
  });

  return (
    <div>
      <input
        id="fileButton"
        ref={fileInputRef}
        onChange={fileUploadInputChange}
        type="file"
        hidden
      />
      <Button
        key={"add_emoji"}
        styles={imageButtonStyles}
        onClick={onAddButtonClick}
      >
        <AddIcon />
        <Text weight="semibold" content="Upload Emoji" />
      </Button>
    </div>
  );
};

const renderGridContents = (allEmojis, onEmojiClick) => {
  const allEmojisButtons = renderImageButtons(allEmojis, onEmojiClick);
  const addEmojiButton = renderAddEmojiButton();
  allEmojisButtons && allEmojisButtons.unshift(addEmojiButton);
  return allEmojisButtons || addEmojiButton;
};

export const CustomEmojisComponent = ({ messageId, userId, convId }) => {
  const [allEmojis, setAllEmojis] = React.useState([]);
  React.useEffect(() => {
    getCustomImages("").then((emojis) => {
      if(!emojis){
        setAllEmojis(getAllMockEmojis());
      }else{
      setAllEmojis(emojis);
      }
    });
  }, []);
  const onEmojiClick = (emoji) => {
    selectCustomImage(emoji.id, userId, messageId, convId, emoji.src);
  };
  return (
    <div>
      <Grid
        accessibility={gridHorizontalBehavior}
        columns={8}
        content={renderGridContents(allEmojis, onEmojiClick)}
      />
    </div>
  );
};
