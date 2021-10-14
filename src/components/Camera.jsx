import * as React from "react";
import { Button, Flex, Card } from "@fluentui/react-northstar";
import "./Camera.css";
import { uploadUserImage } from "./data";

const width = 320;
const height = 240;

export const Camera = ({ userId }) => {
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const photoRef = React.useRef(null);
  React.useEffect(() => {
    if (videoRef.current) {
      init(videoRef.current);
    }
  }, [videoRef]);

  const onCameraClick = (e) => {
    takePicture(canvasRef.current, videoRef.current, photoRef);
    e.preventDefault();
  };

  const onConfirmClick = () => {
    // upload to server
    uploadUserImage(userId, photoRef.current);
  };

  const onCancelClick = () => {
    clearPhoto(canvasRef.current, photoRef.current);
  };

  const onVideoCanPlay = () => {
    console.log("can play");
  };

  return (
    <Flex gap="gap.large" className={"shootEmojiContainer"}>
      <Card size="large">
        <Card.Body fitted>
          <Flex column gap="gap.small" className={"cardContentFlex"}>
            <video
              onCanPlay={onVideoCanPlay}
              ref={videoRef}
              className={"videoContainer"}
            ></video>
            <Button content={"Take photo"} onClick={onCameraClick} />
          </Flex>
        </Card.Body>
      </Card>
      <Card size="large">
        <Card.Body fitted>
          <Flex column gap="gap.small" className={"cardContentFlex"}>
            <canvas ref={canvasRef} className={"canvasContainer"}></canvas>
            <Flex>
              <Button content={"Upload"} onClick={onConfirmClick} />
              <Button content={"Cancel"} onClick={onCancelClick} />
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  );
};

export const init = (video) => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
        },
      },
      audio: false,
    })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function (err) {
      console.log("An error occurred: " + err);
    });
};

export const takePicture = (canvas, video, photoRef) => {
  var context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    var data = canvas.toDataURL("image/png");
    // .replace("image/png", "image/octet-stream");
    photoRef.current = cleanData(data);
    console.log(`take photo`);
  } else {
    clearPhoto(canvas, photo);
  }
};

const cleanData = (data) => {
  const index = data.indexOf("base64,");
  return data.substring(index + 7);
};

export const clearPhoto = (canvas, photo) => {
  var context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);
  photo = null;
  console.log(`photo: ${JSON.stringify(photo)}`);
};
