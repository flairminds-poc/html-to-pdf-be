const con = require('./dbConnection.js');

if (con) {
    const queries = [
        `CREATE TABLE IF NOT EXISTS training_tracker_dev.users_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL, 
            email VARCHAR(255) NOT NULL,
            age VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS training_tracker_dev.documents (
            id INT NOT NULL,
            unique_identifier VARCHAR(255) NOT NULL,
            link VARCHAR(255) NOT NULL,
            FOREIGN KEY (id) REFERENCES users_data(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    ];

    try {
        con.query(queries.join(";"), (error) => {
            if (error) throw error;
        });
    } catch (error) {
        if (error.code === "ER_BAD_DB_ERROR") {
            console.info("Database 'Training_Tracker' does not exist. Please create it.");
        } else {
            console.info(error);
        }
    }

    var executeQuery = (query, params = []) => {
        return new Promise((resolve, reject) => {
            con.query(query, params, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    module.exports = { executeQuery, con };
}
