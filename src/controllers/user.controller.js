import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt';
import { deleteOneVarchar, getOneVarchar, insertMany, putmany } from "../services/universal.service.js";
import { sendOtptoEmail } from "../utils/email.js";
import { hashPassword } from "../utils/hash.js";
import { userValid } from "../validation/uservalid.js"
import { otpValidation } from '../validation/otp.valid.js';
import { accessTokenGenerator, refreshTokenGenerator } from '../utils/jwt.js';


export const userRegister = async (req, res) => {
    try {

        const otpnumber = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const validData = await userValid(req.body, 'register');

        const checkUser = await getOneVarchar('users', 'email', validData.email);

        if (checkUser[0]) {
            return res.status(400).send({
                message: "User alaqachon mavjud..."
            });
        };

        validData.password = await hashPassword(validData.password);

        if (validData.role) {
            const user = await insertMany('users', ['username', 'email', 'password', 'role'], [validData.username, validData.email, validData.password, validData.role]);
        } else {
            const user = await insertMany('users', ['username', 'email', 'password',], [validData.username, validData.email, validData.password]);
        }

        await insertMany('otps', ['email', 'otp',], [validData.email, otpnumber]);

        const otpResponse = await sendOtptoEmail(otpnumber, validData.email);

        return res.status(201).send({
            massage: "User yaratildi va emailingizga tasdiqlash kodi yuborildi..."
        });


    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    };
};

export const userOtpVerify = async (req, res) => {
    try {

        const validData = await otpValidation(req.body);

        const userInfo = await getOneVarchar('otps', 'email', validData.email);

        if (!userInfo.length) {
            return res.status(400).send({
                message: "User mavjud emas"
            });
        };

        if (userInfo[0].otp !== validData.otp) {
            return res.status(422).send({
                message: "Invalid OTP"
            });
        };

        await deleteOneVarchar('otps', 'email', validData.email);
        await putmany('users', ['status'], ['active'], 'email', validData.email);

        return res.status(200).send({
            message: "Foydalanuvchi tasdiqlandi!"
        });

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    };
}

export const userLogin = async (req, res) => {
    try {

        const validData = await userValid(req.body, 'login');

        const user = await getOneVarchar('users', 'username', validData.username);

        if (!user.length) {
            return res.status(400).send({
                error: "User not found"
            });
        };

        const data = await bcrypt.compare(validData.password, user[0].password);
        
        if(!data){
            return res.status(400).send({
                message: "Password incorrect"
            });
        };
        
        const accessToken = accessTokenGenerator({email: user.email, role: user.role});
        const refreshToken = refreshTokenGenerator({email: user.email, role: user.role});

        const info = await getOneVarchar('refreshTokens', 'email', user[0].email);

        if(!info.length){
            await insertMany('refreshTokens', ['email', 'token'], [user[0].email, refreshToken]);
        } else {
            await putmany('refreshTokens', ['token'], [refreshToken], 'email', user[0].email);
        }

        return res.status(200).send({
            message: "Ok",
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: err
        });
    };
}