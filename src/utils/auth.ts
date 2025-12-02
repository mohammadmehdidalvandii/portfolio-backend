import {hash , compare} from 'bcryptjs';
import { sign , verify , JwtPayload   } from  'jsonwebtoken';

interface MyTokenPayload  extends JwtPayload{
    data:{id:string , [key:string]:any}
}

const securityCode = process.env.SRC_CODE || 'JANCJNJKASNJNDLKACKASMKLCMK;EPNWINK;LAMSLDMAL;SMD;LAMD;LA';

if(!securityCode){
    throw new Error('Security code is not found')
}

const generateToken = (data:Record<string , any>)=>{
    try{
        const token = sign({data}, securityCode ,{expiresIn:'1h'});
        return token
    }catch(error){
        console.log('Invalid generate token', error)
    }
};

const verifyToken = (token:string)=>{
    try{
        const payload = verify(token , securityCode) as MyTokenPayload;
        return payload
    }catch(error){
        console.log("Invalid Verify Token =>", error)
    }
};


const hashedPassword = async (password:string)=>{
    const hashPassword = await hash(password ,10);
    return hashPassword
};

const comparePassword = async (password:string , hashPassword:string)=>{
    const validPassword = await compare(password , hashPassword);
    return validPassword;
};


export {
    generateToken ,
    verifyToken,
    hashedPassword,
    comparePassword
}