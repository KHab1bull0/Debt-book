import { getAll, getOneVarchar, insertMany, putmany } from "../services/universal.service.js";
import { debtvalid } from "../validation/dept.valid.js";


export const postDepts = async (req, res) => {
    try {

        const validData = await debtvalid(req.body);
        const insertinfo = await insertMany('depts', ['amount', 'description', 'due_date', 'status'],
            [validData.amount, validData.description, validData.due_date, validData.status]);

        return res.status(201).send({
            message: "Yangi qarz qo'shildi."
        });

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    };
}

export const getdepts = async (req, res) => {
    try {
        const arr = ['new', 'paid', 'cancaled'];
        const { status } = req.body;

        if (!status) {
            const depts = await getAll('depts');
            return res.status(200).send({
                message: "Depts",
                data: depts
            });

        } else if (typeof status == 'string') {

            if (!arr.includes(status)) {
                return res.status(200).send({
                    message: "Invalid status"
                });
            };

            const depts = await getOneVarchar('depts', 'status', status);
            return res.status(200).send({
                message: "Depts",
                data: depts
            });
        }

        return res.status(200).send({
            message: "Invalid status"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    };
}


export const putOneDepts = async (req, res) => {
    try {

        const validData = await debtvalid(req.body);

        const updateinfo = await putmany('depts', )

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    };
}