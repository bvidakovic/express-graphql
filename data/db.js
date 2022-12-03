const data = require('./db.json');
const fs = require('fs');
const path = require('path');

class DB {
    constructor() {
        this.db = data;
    }

    get data() {
        return this.db;
    }

    async write(data) {
        await fs.writeFileSync(
            path.join(__dirname, './db.json'),

            JSON.stringify(data, null, '   ')
        );
        return 'done';
    }
}

module.exports = {
    db: new DB(),
};
