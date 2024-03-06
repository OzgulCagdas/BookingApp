import { CreateError } from "../utils/error.js";
import User from "../models/User.js";
import jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
    try {
        //console.log("Gelen Bilgiler:", req.body); // Gelen bilgileri konsola yazdırma
        // Şifreyi hashleme
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Yeni kullanıcı oluşturma
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            is_admin: req.body.is_admin,
            password:hash // Hashlenmiş şifreyi kaydetme
        });
        // console.log(newUser); // Gelen bilgile  ri konsola yazdırma
        // Yeni kullanıcıyı kaydetme
        await newUser.save();

        res.status(200).send("Kullanıcı oluşturuldu");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        //console.log(req.body);
        const user = await User.findOne({ where: { username: req.body.username } });
       if (!user) return next(CreateError(404, "User not found"));
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if (!isPasswordCorrect) return next(CreateError(404, "Wrong Username and password "));
       // res.status(200).send("Kullanıcı bulundu");
       //passworda ulasilmasini engellemek icin 
       const token = jwt.sign(
        { id: user.id, is_admin: user.is_admin },
         process.env.JWT
         );  //openssl rand -base64 32  burda key geliyor 
       //irO81cX1EmoPi+PrWVVtn2kqTDOpQky+K1+VNTchB+Q=
        // sonra tokeni cekmek icin cookie-parcer yüklüyorum npm add cookie-parser

       const {password, is_admin, ...otherDetails} = user._previousDataValues;  //._previousDataValues; ile password ve is_admin bilgininnin jsonla client bölüme girmesi engellenmis oldu
        //postmadan bakinca password ve is_admin bilgine userdan dönmiycek  ve jsonwebtoken yüklenir
      // res.status(200).json(user);
     //res.status(200).json({...otherDetails});

     res
     .cookie("access_token",token,{
        httpOnly:true, // much more security
     })
     .status(200)
     .json({...otherDetails});
    } catch (err) {
        next(err);
    }
};


