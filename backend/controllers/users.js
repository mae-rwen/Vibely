const { User } = require("../models/users");
const cloudinary = require("cloudinary").v2;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorResponse } = require("../utils/ErrorResponse");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    const userName = await User.findOne({ name });
    if (user) throw new ErrorResponse("Email already exists", 409);
    if (userName) throw new ErrorResponse("User Name already exists", 409);

    const hash = await bcrypt.hash(password, 8);
    const newUser = await User.create({ name, email, password: hash });
    const payload = { id: newUser, email: newUser.email, name: newUser.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8,
      })
      .send(payload);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user =
      (await User.findOne({ email }).select("+password")) ||
      User.findOne({ name }).select("+password");
    if (!user)
      throw new ErrorResponse(
        "No account associated with the email address",
        404
      );

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ErrorResponse("Invalid password", 401);

    const payload = { id: user._id, email: user.email, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8,
      })
      .send(payload);
    // console.log(payload);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  // res
  //   .cookie("access_token", "", {
  //     httpOnly: true,
  //     maxAge: 0,
  //   })
  res
    .clearCookie("access_token")
    .send("See you later, alligator");
};

const getProfile = async (req, res, next) => {
  try {
    const { email, id } = req.user;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json([users]);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, description, name, location, profilePic } = req.body;

    if (profilePic) {
      const result = await cloudinary.uploader.unsigned_upload(
        profilePic,
        "c01lxqzs",
        {
          max_bytes: 10000000,
        }
      );
      const user = await User.findByIdAndUpdate(
        id,
        { email, description, name, location, profilePic: result.secure_url },
        { new: true }
      );
      res.json(user);
    } else {
      const user = await User.findByIdAndUpdate(
        id,
        { email, description, name, location, profilePic: profilePic },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getProfile,
  updateUser,
  getUsers,
};
