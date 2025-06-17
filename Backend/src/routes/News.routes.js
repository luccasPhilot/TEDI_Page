const express = require("express");
const router = express.Router();
const newsController = require("../controller/NewsController");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../config/upload");

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  newsController.createNews
);

router.get("/", newsController.getAllNews); // ver se irei bloquear
router.get("/latest", newsController.getLatestNews);
router.get("/:id", newsController.getNewsById);

router.get("/:id/image", newsController.getNewsImage);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  newsController.updateNews
);

router.patch("/:id/toggle-draft", authMiddleware, newsController.toggleDraft);


router.delete("/:id", authMiddleware, newsController.deleteNews);

module.exports = router;
