import * as request from '~/utils/request';

export const searchAll = async (q, per_page) => {
    try {
        const res = await request.get('search/users', {
            params: { q, per_page },
        });
        let results = [];

        for (let i = 0; i < res.items.length; i++) {
            const accountProfile = await searchOne(res.items[i].login);
            if (!results.includes(accountProfile)) results.push(accountProfile);
        }

        return results;
    } catch (err) {
        console.log(err);
    }
};
export const searchOne = async user => {
    try {
        const res = await request.get(`/users/${user}`);
        return res;
    } catch (err) {
        console.log(err);
    }
};
