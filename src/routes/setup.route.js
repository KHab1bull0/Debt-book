import { deptsTable } from "../models/dept.model.js";
import { createOtpTable } from "../models/otp.model.js";
import { refreshTokenTable } from "../models/refreshtoken.js";
import { dropAll, userTable } from "../models/user.model.js";



export const setUp = async (req, res) => {
    try{

        await dropAll();
        await userTable();
        await createOtpTable();
        await refreshTokenTable();
        await deptsTable()

        return res.status(200).send({
            message: "OK"
        });

    }catch(err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    }
}