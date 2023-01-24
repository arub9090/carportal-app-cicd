const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/auth");
const { requireSignin } = require("../middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.post("/send-email", sendPassResetEmail);
router.post("/reset-password", resetPassword);
router.post("/create-product", requireSignin, createProduct);
router.get("/current-user-posts", requireSignin, currentUserPosts);
router.post("/single-post", singlePostDetails);
router.post("/update-single-product", requireSignin, updateSingleProduct);
router.get("/all-posts", getAllPosts);

module.exports = router;
