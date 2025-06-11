const express = require("express");
const router = express.Router();
const teamMemberController = require("../controller/TeamMemberController");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../config/upload");

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  teamMemberController.createTeamMember
);

router.get("/", teamMemberController.getAllTeamMembers);
router.get("/:id/image", teamMemberController.getTeamMemberImage);

router.get("/:id", authMiddleware, teamMemberController.getTeamMemberById);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  teamMemberController.updateTeamMember
);

router.delete("/:id", authMiddleware, teamMemberController.deleteTeamMember);

module.exports = router;
