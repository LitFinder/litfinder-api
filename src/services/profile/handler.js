import Profile from "./controller";


const UpdateProfile = async (request, h) => {

  const { user_id, name, password } = request.payload;
  const result = await Profile.updateProfile({ user_id, name, password });

  return h.response({
    status: "success",
    message: "Profile updated successfully",
    data: result,
  }).code(200);

};

export { UpdateProfile };