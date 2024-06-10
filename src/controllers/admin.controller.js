import { getAll } from "../services/universal.service.js";


export const getUsers = async (req, res) => {
    try {

        const user = await getAll('users');

        return res.status(200).send({
            data: user
        });


    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    };
}