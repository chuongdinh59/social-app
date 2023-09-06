import {
  URL_CURRENT_USER,
  URL_REGISTER,
  URL_UPLOAD_AVATAR,
  URL_UPLOAD_BG,
  URL_USER_BY_ID_OR_SLUG
} from '../constant/url';
import http from '../utils/http';
const userService = {
  getCurrentUser() {
    return http.get(`${URL_CURRENT_USER}`);
  },
  registerAccount(body) {
    return http.post(URL_REGISTER, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateAccount(body) {
    return http.post(URL_USER, body);
  },
  updateAvatar(body) {
    console.log(body);
    return http.post(URL_UPLOAD_AVATAR, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateBackground(body) {
    return http.post(URL_UPLOAD_BG, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  // body {id, slug} | {id} | {slig}
  getUserBySlugOrId(body) {
    return http.get(URL_USER_BY_ID_OR_SLUG(body));
  }
};

export default userService;

// const handleImageChange = (event) => {
//   const file = event.target.files[0]; // Get the selected file
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       console.log(event.target.id);
//       if (event.target.id === 'image-input-bg') {
//         setBackgroundImage(e.target.result); // Update background image
//         setBackgroundImageFile(file);
//       } else {
//         setImageSrc(e.target.result); // Update avatar image
//         setAvatarFile(file);
//       }
//       setProfileToLS({
//         ...user,
//         avatar: e.target.result
//       });
//     };
//     reader.readAsDataURL(file); // Read the file as a data URL
//   }
// };
// const handleUpdateImage = async () => {
//   if (avatarFile !== null) {
//     user = { ...user, avatarFile: avatarFile };
//     console.log(imageSrc);
//     setProfileToLS({
//       ...user,
//       avatar: imageSrc
//     });
//   }
//   if (backgroundImageFile !== null) {
//     user = { ...user, coverBg: backgroundImageFile };
//     setProfileToLS({
//       ...user,
//       coverBg: backgroundImage
//     });
//   }
//   if (displayName !== null && displayName !== user.displayName) {
//     user = { ...user, displayName: displayName };
//     setProfileToLS({
//       ...user,
//       displayName
//     });
//   }
//   await userService.updateAvatar(avatarFile);
//   // mutation.mutateAsync({ files: avatarFile }, { files: backgroundImageFile });
// };
