const db = require("../database/index");

const getbrands = async (req, res) => {
    try {
        const brands = await db.Brands.findAll();
        console.log(brands);

        res.send(brands);
    } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).send("Failed to fetch brands");
    }
};