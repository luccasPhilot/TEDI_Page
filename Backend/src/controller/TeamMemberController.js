const TeamMemberService = require('../service/TeamMemberService');

const createTeamMember = async (req, res) => {
    try {
        const newData = req.body;
        const teamMember = await TeamMemberService.createTeamMember(newData);
        return res.status(200).json(teamMember);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMemberService.getAllTeamMembers();
        return res.status(200).json(teamMembers);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getTeamMemberById = async (req, res) => {
    try {
        const { id } = req.params;
        const teamMember = await TeamMemberService.getTeamMemberById(id);
        return res.status(200).json(teamMember);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const teamMember = await TeamMemberService.updateTeamMember(id, updateData);
        return res.status(200).json(teamMember);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        await TeamMemberService.deleteTeamMember(id);
        return res.status(200).json({message: 'Membro da equipe deletado'});
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deleteTeamMember
};
