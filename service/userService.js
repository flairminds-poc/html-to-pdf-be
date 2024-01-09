const { executeQuery } = require('../db_config/dbSchema.js');

const insUserData = async(data) => {
    const insUser = `INSERT INTO training_tracker_dev.users_data (name, phone, email, age) VALUES (?, ? ,?, ?)`;
    const insertUsersParams = [data.name, data.phone, data.email, data.age];
    return executeQuery(insUser, insertUsersParams);
}

module.exports = { insUserData };