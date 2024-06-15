import bucket from "../../storage";
import hashPassword from "../../utils/hashPassword";
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

const UpdateName = async (request, h) => {
  const { user_id, name } = request.payload ?? {
    user_id: null,
    name: null,
  };

  if (!user_id) {
    return h
      .response({
        status: "fail",
        message: "No user_id provided",
      })
      .code(400);
  }

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "No name provided",
      })
      .code(400);
  }

  const result = await Profile.updateUserProfile({
    column: "name",
    value: name,
    user_id,
  });

  const profile = await Profile.getProfile({ user_id });

  return h
    .response({
      status: "success",
      message: "Name updated successfully",
      newData: profile,
    })
    .code(200);
};

const UpdateBio = async (request, h) => {
  const { user_id, bio } = request.payload ?? {
    user_id: null,
    bio: null,
  };

  if (!user_id) {
    return h
      .response({
        status: "fail",
        message: "No user_id provided",
      })
      .code(400);
  }

  if (!bio) {
    return h
      .response({
        status: "fail",
        message: "No bio provided",
      })
      .code(400);
  }

  const result = await Profile.updateUserProfile({
    column: "bio",
    value: bio,
    user_id,
  });

  const profile = await Profile.getProfile({ user_id });

  return h
    .response({
      status: "success",
      message: "Name updated successfully",
      newData: profile,
    })
    .code(200);
};

const UpdatePassword = async (request, h) => {
  const { user_id, old_password, new_password } = request.payload ?? {
    user_id: null,
    old_password: null,
    new_password: null,
  };

  if (!user_id) {
    return h
      .response({
        status: "fail",
        message: "No user_id provided",
      })
      .code(400);
  }

  if (!old_password) {
    return h
      .response({
        status: "fail",
        message: "No old_password provided",
      })
      .code(400);
  }

  if (!new_password) {
    return h
      .response({
        status: "fail",
        message: "No new_password provided",
      })
      .code(400);
  }

  if (old_password === new_password) {
    return h
      .response({
        status: "fail",
        message: "Old password and new password cannot be the same",
      })
      .code(400);
  }

  const profile = await Profile.getProfilePassword({ user_id });

  if (!profile) {
    return h
      .response({
        status: "fail",
        message: "User not found",
      })
      .code(404);
  }

  // compare menggunakan crypto md5
  const isValid = profile.password === await hashPassword(old_password);


  if (!isValid) {
    return h
      .response({
        status: "fail",
        message: "Old password is incorrect",
      })
      .code(400);
  }

  const hashedPassword = await hashPassword(new_password);

  const result = await Profile.updateUserProfile({
    column: "password",
    value: hashedPassword,
    user_id,
  });
  

  return h
    .response({
      status: "success",
      message: "Password updated successfully",
    })
    .code(200);
};

export { UpdateProfile, UpdatePicture, UpdateName, UpdateBio, UpdatePassword };
