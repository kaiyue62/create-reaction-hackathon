import * as React from 'react';
import {
    Grid,
    Image,
    Button,
    gridHorizontalBehavior,
    AddIcon,
    Text
  } from '@fluentui/react-northstar'
import { getAllMockEmojis } from "./MockData";

const imageButtonStyles = {
  minWidth: '150px',
  maxWidth: '150px',
  height: '150px',
  padding: '0',
  margin: '5px',
}

const renderImageButtons = () => {
  // Todo: get emoji from server
    const allEmojis = getAllMockEmojis();
    return allEmojis.map(emoji => (
      <Button key={emoji.id} styles={imageButtonStyles} title={emoji.name}>
        <Image
          fluid
          src={emoji.src}
        />
      </Button>
      ));
  }

const renderAddEmojiButton = () => {
  const fileInputRef = React.useRef(null);

  const onAddButtonClick = React.useCallback(() => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  });

  const fileUploadInputChange = React.useCallback(e => {
    // Todo: get upload file and update to server
    // uploaded file: e.target.value 
  });

  return <div>
    <input id="fileButton" ref={fileInputRef}  onChange={fileUploadInputChange} type="file" hidden />
    <Button key={'add_emoji'} styles={imageButtonStyles} onClick={onAddButtonClick}>
      <AddIcon />
      <Text weight="semibold" content="Upload Emoji"/>
    </Button>
  </div>;
}

const renderGridContents = () => {
  const allEmojisButtons = renderImageButtons();
  const addEmojiButton = renderAddEmojiButton();
  allEmojisButtons.unshift(addEmojiButton);
  return allEmojisButtons;
}

export const CustomEmojisComponent = () => (
  <div>
    <Grid accessibility={gridHorizontalBehavior} columns={8} content={renderGridContents()} />
  </div>);