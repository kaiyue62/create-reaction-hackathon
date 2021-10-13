import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import "./Camera.css";
import * as axios from 'axios';
import { uploadUserImage } from './data';

const width = 320;
const height = 240;

export const Camera = ({messageId, userId, convId}) => {
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const photoRef = React.useRef(null);
  React.useEffect(() => {
    if (videoRef.current) {
      init(videoRef.current);
    }
  }, [videoRef]);

  const onCameraClick = (e) => {
    takePicture(canvasRef.current, videoRef.current, photoRef.current);
    e.preventDefault();
  };

  const onConfirmClick = () => {
    // upload to server
    uploadUserImage(messageId, userId, convId, photoRef.current);
  };

  const onCancelClick = () => {
    clearPhoto(canvasRef.current, photoRef.current);
  };

  const onVideoCanPlay = () => {
    console.log("can play");
  };

  return (
    <>
      <video
        onCanPlay={onVideoCanPlay}
        ref={videoRef}
        className={"videoContainer"}
      ></video>
      <Button content={"Take photo"} onClick={onCameraClick} />
      <canvas ref={canvasRef} className={"canvasContainer"}></canvas>
      <Button content={"Upload"} onClick={onConfirmClick} />
      <Button content={"Cancel"} onClick={onCancelClick} />
    </>
  );
};

export const init = (video) => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
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

export const takePicture = (canvas, video, photo) => {
  var context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    var data = canvas.toDataURL("image/png");
    photo = data;
    console.log(`photo: ${JSON.stringify(photo)}`);
  } else {
    clearPhoto(canvas, photo);
  }
};

export const clearPhoto = (canvas, photo) => {
  var context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);
  photo = null;
  console.log(`photo: ${JSON.stringify(photo)}`);
};
