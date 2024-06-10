import { deleteOneInt, getAll, getOneVarchar, insertMany, putmany } from "../services/universal.service.js";
import { debtvalid } from "../validation/dept.valid.js";


export const postDepts = async (req, res) => {
    try {

        const validData = await debtvalid(req.body);
        const insertinfo = await insertMany('depts', ['amount', 'description', 'due_date', 'status'],
            [validData.amount, validData.description, validData.due_date, validData.status]);

        return res.status(201).send({
            message: "Yangi qarz qo'shildi.",
            data: insertinfo
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
        const { id } = req.params
        if (!id) {
            return res.status(400).send({
                message: "id is required"
            })
        }

        const validData = await debtvalid(req.body);
        console.log(validData);

        const updateinfo = await putmany('depts', ['amount', 'description', 'due_date', 'status'], [validData.amount, validData.description, validData.due_date, validData.status],
            'id', id);

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

export const deletedebt = async (req, res) => {
    try {

        const { id } = req.params;
        if(!id){
            return res.status(400).send({
                message: "id is required"
            });
        };

        const deleteinfo = await deleteOneInt('depts', 'id', id);

        console.log(deleteinfo);
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