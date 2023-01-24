const bcrypt = require("bcrypt");
const User = require("../models/User");
const Userpost = require("../models/Advertise");
const jwt = require("jsonwebtoken");
const { comparePassword, hashPassword } = require("../utils/auth");
const AWS = require("aws-sdk");
const ShortUniqueId = require("short-unique-id");
const shortCodeGen = new ShortUniqueId({ length: 6 });

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //form validation
    if (!name || !email || !password) {
      return res.status(400).json("Form Vlaidation failed");
    }

    // check if the user already resigtered witht hat email

    const userExists = await User.findOne({ email }).exec();

    if (userExists) {
      return res
        .status(400)
        .json("User already Registered, Try login instead!");
    }

    // if user needs to be created --> hash the password and save it to mongoDB

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user on db

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // if userCreated susscessfully send the OK flag to frontend
    if (user) {
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json("Failed Registering the user");
  }
};

const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong Credentials");

    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // return user and token to client, exclude hashed password
    user.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json("Logout was Failed");
  }
};

const currentUser = async (req, res) => {
  //console.log("Current User Requested", req.user._id);
  try {
    const currentUser = await User.findById(req.user._id)
      .select("-password")
      .exec();

    //console.log("Current User info", currentUser);
    return res.status(200).json(currentUser);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json("User not found ON BE Redirecting to Login Page");
  }
};

const sendPassResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const shortCode = shortCodeGen();
    // check if our db has user with that email
    const user = await User.findOneAndUpdate(
      { email: email },
      { passwordResetTempCode: shortCode }
    ).exec();
    if (!user) return res.status(400).send("No user found");

    const params = {
      Source: `CARPORTAL DEV <${process.env.EMAIL_FROM}>`,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
            <html>
              <h1>Reset password Using the following Code.</h1>
              <h2 style="color:red">${shortCode}</h2>
              <p>Please use the following Code to reset your password on Carportal</p>
              <i>Please Don't Share this code to anyone! Carportal Employee never asks for this code by phone or Email </i>
            </html>
          `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "CarPortal Password Reset Code",
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        //console.log("email submitted to SES", data);
        res.json({ ok: true });
      })
      .catch((err) => {
        console.log(err);
        res.json({ ok: false });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json("Failed to send email");
  }
};

const resetPassword = async (req, res) => {
  const { email, secretCode, newPassword } = req.body;
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOneAndUpdate(
      {
        email: email,
        passwordResetTempCode: secretCode,
      },
      { password: hashedPassword, passwordResetTempCode: "" }
    ).exec();

    if (user && user.name) {
      res.json({ ok: true });
    } else {
      throw new Error("Password Reset Failed, Possible Wrong Reset Code");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json("Failed to reset password On BE");
  }
};

const createProduct = async (req, res) => {
  const {
    title,
    make,
    model,
    year,
    trim,
    bodytype,
    color,
    mileage,
    vin,
    condition,
    fueleconomy,
    safetyfeature,
    price,
    video,
    postimage,
    country,
    city,
    description,
  } = req.body;

  try {
    const product = await new Userpost({
      creator: req.user._id,
      title,
      make,
      model,
      year,
      trim,
      bodytype,
      color,
      mileage,
      vin,
      condition,
      fueleconomy,
      safetyfeature,
      price,
      video,
      postimage,
      country,
      city,
      description,
    }).save();

    const userUpdate = await User.findByIdAndUpdate(req.user._id, {
      $push: { advertisePosts: product._id },
    }).exec();

    if (product && userUpdate) {
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json("Failed to Create Product");
  }
};

const currentUserPosts = async (req, res) => {
  try {
    const userPosts = await Userpost.find({ creator: req.user._id })
      .populate("creator", "name")
      .exec();
    res.json(userPosts);
  } catch (err) {
    console.log(err);
    return res.status(400).json("Failed to get User Posts");
  }
};

const singlePostDetails = async (req, res) => {
  const { pid } = req.body;
  try {
    const singlePost = await Userpost.findById(pid)
      .populate("creator", "name")
      .exec();
    res.json(singlePost);
  } catch (err) {
    console.log(err);
    return res.status(400).json("Failed to get this Single Post");
  }
};

const updateSingleProduct = async (req, res) => {
  const { pid } = req.body;
  const {
    title,
    make,
    model,
    year,
    trim,
    bodytype,
    color,
    mileage,
    vin,
    condition,
    fueleconomy,
    safetyfeature,
    price,
    video,
    postimage,
    country,
    city,
    description,
  } = req.body;

  try {
    const singlePost = await Userpost.findById(pid).exec();
    if (singlePost.creator.toString() === req.user._id.toString()) {
      const updatedPost = await Userpost.findByIdAndUpdate(
        pid,
        {
          title,
          make,
          model,
          year,
          trim,
          bodytype,
          color,
          mileage,
          vin,
          condition,
          fueleconomy,
          safetyfeature,
          price,
          video,
          postimage,
          country,
          city,
          description,
        },
        { new: true }
      ).exec();

      return res.status(200).json({ ok: true, updatedPost });
    } else {
      return res.status(400).json("You are not Authorized to Update this Post");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json("Failed to Update this Single Post");
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Userpost.find({}).populate("creator", "name").exec();
    return res.status(200).json(allPosts);
  } catch (err) {
    console.log(err);
    return res.status(400).json("Failed to get all Posts");
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  sendPassResetEmail,
  resetPassword,
  createProduct,
  currentUserPosts,
  singlePostDetails,
  updateSingleProduct,
  getAllPosts,
};
