const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const singUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const newUser = new User({ email, password, avatarURL, verificationToken });
  newUser.setPassword(password);
  newUser.save();
  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
      },
    },
  });
};

module.exports = singUp;
