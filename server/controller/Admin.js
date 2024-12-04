const db = require("../database/index");

const deleteUser=async (req, res) => {
    const userId = req.params.id;
    try {
        await db.User.destroy({ where: { id: userId } });
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send('Server error');
    }
}


const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll(); 
        return res.status(200).json(users); 
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send('Server error');
    }
}

module.exports = {getAllUsers,deleteUser};
