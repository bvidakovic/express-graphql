import data from './data.json';
import fs from 'fs';
import path from 'path';

export const db = {
    data,
    write: async (data: any) => {
        await fs.writeFileSync(
            path.join(__dirname, './db.json'),

            JSON.stringify(data, null, '   ')
        );
        return 'done';
    },
};
