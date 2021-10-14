import * as React from "react";
import {
  Grid,
  Image,
  Button,
  gridHorizontalBehavior,
  AddIcon,
  Text,
} from "@fluentui/react-northstar";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { getAllMockEmojis } from "./MockData";

const imageButtonStyles = {
  width: "calc(100% - 10px)",
  height: "80%",
  margin: "10px 5px",
};

const AddEmoji = ({ style }) => {
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
    <div style={style}>
      <input
        id="fileButton"
        ref={fileInputRef}
        onChange={fileUploadInputChange}
        type="file"
        hidden
      />
      <Button
        text
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

const ItemRenderer = (props) => {
  const { columnIndex, data, rowIndex, style } = props;
  const index = rowIndex * data.columnCount + columnIndex;

  const item =
    data.items && data.items.length > index ? data.items[index] : null;
  if (!item) {
    return null;
  }
  if (item.id === "add-emoji") {
    return <AddEmoji style={style} />;
  }
  return (
    <div style={style}>
      <Button styles={imageButtonStyles} text key={item.id} title={item.name}>
        <Image
          style={{ "max-height": "100%", "max-width": "100%" }}
          src={item.src}
        />
      </Button>
    </div>
  );
};

export const CustomEmojisComponent = () => {
  const allEmojis = getAllMockEmojis();
  const gridData = [{ id: "add-emoji" }, ...allEmojis];

  const columnCount = 6;
  const rowCount = Math.ceil(gridData.length / columnCount);
  const itemData = React.useMemo(() => ({
    columnCount,
    items: gridData,
  }));

  const autoSizerChild = (height, width) => {
    const columnWidth = Math.floor(width / columnCount);
    return (
      <FixedSizeGrid
        className={"FixedSizeGrid"}
        columnCount={columnCount}
        rowCount={rowCount}
        width={width}
        height={height}
        columnWidth={columnWidth}
        rowHeight={150}
        initialScrollTop={0}
        itemData={itemData}
        style={{ overflowX: "hidden" }}
      >
        {ItemRenderer}
      </FixedSizeGrid>
    );
  };

  const virtualizedGrid = (
    <AutoSizer>
      {({ height, width }) => autoSizerChild(height, width)}
    </AutoSizer>
  );

  return (
    <Grid
      accessibility={gridHorizontalBehavior}
      content={virtualizedGrid}
      style={{ height: "100%", width: "100%" }}
    />
  );
};
