import bucket from "../../storage";
import Profile from "./controller";

const UpdateProfile = async (request, h) => {
  const { user_id, name, password } = request.payload;
  const result = await Profile.updateProfile({ user_id, name, password });

  return h
    .response({
      status: "success",
      message: "Profile updated successfully",
      data: result,
    })
    .code(200);
};

const UpdatePicture = async (request, h) => {
  const { picture, user_id } = request.payload ?? {
    picture: null,
    user_id: null,
  };

  if (!picture) {
    return h
      .response({
        status: "fail",
        message: "No picture uploaded",
      })
      .code(400);
  }

  if (!user_id) {
    return h
      .response({
        status: "fail",
        message: "No user_id provided",
      })
      .code(400);
  }

  const fileName = picture.hapi.filename;
  const data = picture._data;
  // random name for file
  const randomName = `${new Date().getTime()}-${fileName}`;

  const file = bucket.file(`uploads/profile/${randomName}`);

  const getProfile = await Profile.getProfile({ user_id });

  if (!getProfile) {
    return h
      .response({
        status: "fail",
        message: "User not found",
      })
      .code(404);
  }

  if (getProfile.imageProfile != null) {
    const oldName = getProfile.imageProfile.split("/").pop();

    const imageProfile = bucket.file(`uploads/profile/${oldName}`);

    try {
      imageProfile.delete();
    } catch (error) {
      console.log(error);
    }
  }

  file.save(data, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File uploaded successfully");

    Profile.updateUserProfile({
      column: "imageProfile",
      value: `https://storage.googleapis.com/${bucket.name}/uploads/profile/${randomName}`,
      user_id,
    });
  });

  const profile = await Profile.getProfile({ user_id });
  return h
    .response({
      status: "success",
      message: "Profile picture updated successfully",
      newData: profile,
    })
    .code(200);
};

export { UpdateProfile, UpdatePicture };
