const { User } = require("../../models/user");
const { HttpError, sendEmail, createVerifyEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);
  res.status(200).json({
    message: "Verification email send",
  });
};

module.exports = resendVerifyEmail;
