import { deleteOneInt, getAll, getOneInt, putmany } from "../services/universal.service.js";
import { userValid } from "../validation/uservalid.js";


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

export const putUser = async (req, res) => {
    try {

        const { id } = req.params;
        console.log(typeof id);
        if (!id) {
            return res.status(400).send({
                message: "id is required"
            });
        };
        const validData = await userValid(req.body, 'admin');


        const userInfo = await getOneInt('users', 'id', id);
        console.log(userInfo);

        if (!userInfo.length) {
            return res.status(404).send({
                message: "User topilmadi..."
            });
        }

        const updateinfo = await putmany('users', ['username', 'email', 'role'], [validData.username, validData.email, validData.role], 'id', +id);


        return res.status(200).send({
            message: "Yangilandi...",
            data: updateinfo
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    };
}

export const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;
        console.log(typeof id);
        if (!id) {
            return res.status(400).send({
                message: "id is required"
            });
        };

        const userInfo = await getOneInt('users', 'id', id);
        console.log(userInfo);

        if (!userInfo.length) {
            return res.status(404).send({
                message: "User topilmadi..."
            });
        }


        const deleteinfo = await deleteOneInt('users', 'id', +id);

        return res.status(200).send({
            message: "O'chirildi...",
            data: deleteinfo
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    };
}