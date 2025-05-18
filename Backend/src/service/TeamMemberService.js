const TeamMemberRepository = require('../repositories/TeamMemberRepository');

const createTeamMember = async (data) => {
    return await TeamMemberRepository.create(data);
};

const getTeamMemberById = async (id) => {
    const teamMember = await TeamMemberRepository.findById(id);
    if (!teamMember) {
        throw new Error('Membro da equipe não encontrado');
    }
    return teamMember;
};

const getAllTeamMembers = async () => {
    return await TeamMemberRepository.findAll();
};


const updateTeamMember = async (id, data) => {
    const teamMember = await TeamMemberRepository.findById(id);
    if (!teamMember) {
        throw new Error('Membro da equipe não encontrado');
    }
    return await TeamMemberRepository.update(teamMember, data);
};

const deleteTeamMember = async (id) => {
    const teamMember = await TeamMemberRepository.findById(id);
    if (!teamMember) {
        throw new Error('Membro da equipe não encontrado');
    }
    await TeamMemberRepository.remove(teamMember);
};

module.exports = {
    createTeamMember,
    getTeamMemberById,
    getAllTeamMembers,
    updateTeamMember,
    deleteTeamMember
};


