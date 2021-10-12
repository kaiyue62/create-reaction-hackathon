import axios from "axios";

export const uploadUserImage = (userId, photo) => {
  axios
    .post("", {
      messageId,
      userId,
      convId,
      data: JSON.stringify(photo),
    })
    .then((response) => {
      // check image id?
      console.log("upload succeed");
    })
    .catch((e) => {
      console.log(`upload failed: ${e}`);
    });
};

export const deleteUserImage = () => {
  axios
    .delete("", { userId })
    .then(() => {
      console.log("delete images succeed");
    })
    .catch((e) => {
      console.log(`delete images failed: ${e}`);
    });
};

export const getCustomImages = (userId) => {
  axios
    .get(`/userId/${userId}`)
    .then(() => {
      console.log("fetch images succeed");
    })
    .catch((e) => {
      console.log(`fetch images failed: ${e}`);
    });
};

export const selectCustomImage = () => {
  axios
    .post("", {
      messageId,
      userId,
      convId,
      imageId,
    })
    .then(() => {
      console.log("select image succeed");
    })
    .catch((e) => {
      console.log(`select image failed: ${e}`);
    });
};
