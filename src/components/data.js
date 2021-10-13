import axios from "axios";
import {v4 as uuid} from 'uuid';

export const uploadUserImage = (userId, photo) => {
  axios
    .post("https://customemojiwebapiapi.azure-api.net/v1/CustomEmoji", {
     emoji_id: new uuid(),
     emoji_display_name:"test",
     emoji_autho_userId: userId,
     emoji_state:1,
     emoji_base64_content: JSON.stringify(photo),
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
 return axios
    .get(`https://customemojiwebapiapi.azure-api.net/v1/CustomEmoji`,{headers:{'Access-Control-Allow-Origin' : '*'}})
    .then((response) => {
      console.log(`fetch images succeed: ${response}`);
      const images = JSON.parse(response);
      return images.map((image) => {
      return {
          id: image.emoji_id,
          name: image.emoji_display_name,
          source: image.emoji_url,
        };
      });
    })
    .catch((e) => {
      console.log(`fetch images failed: ${e}`);
    });
};

export const selectCustomImage = (
  emojiId,
  userId,
  msgId,
  chatId,
  emotionSrc
) => {
  axios
    .post("https://www.l2b.ltd/api/message-reactions", {
      emoji_id: emojiId,
      user_id: userId,
      message_id: msgId,
      chat_id: chatId,
      emoji_url: emotionSrc,
    })
    .then(() => {
      console.log("select image succeed");
    })
    .catch((e) => {
      console.log(`select image failed: ${e}`);
    });
};
