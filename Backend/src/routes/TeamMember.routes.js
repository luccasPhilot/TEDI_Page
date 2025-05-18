const express = require('express');
const router = express.Router();
const teamMemberController = require('../controller/TeamMemberController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/', authMiddleware, teamMemberController.createTeamMember);

router.get('/', teamMemberController.getAllTeamMembers);
router.get('/:id', authMiddleware, teamMemberController.getTeamMemberById);

router.put('/:id', authMiddleware, teamMemberController.updateTeamMember);

router.delete('/:id', authMiddleware, teamMemberController.deleteTeamMember);

module.exports = router;
