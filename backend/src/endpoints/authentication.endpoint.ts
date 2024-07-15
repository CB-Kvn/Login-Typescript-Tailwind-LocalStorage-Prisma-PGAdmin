import { Response, Request } from "express";
import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class Authentication {

    

    async signIn(req: Request, res: Response) {

        

        try {
            const { email, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await prisma.user.create({
                data:{
                    email,
                    password:hashedPassword
                }
            })

            res.status(201).json({ message: 'User created', user }); 
            
        } catch (error) {
            res.status(400).json({ error: 'User already exists' });
        }
    }

    async logIn ( req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            const secret = process.env.JWT_SECRET

            if(user && (await bcrypt.compare(password,user.password))){
                const token = jwt.sign({ userId:user.id } , secret!.toString() , { expiresIn: '1h' })
                res.json({ message: 'Login successful', token });
            }else{
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    async health ( req: Request, res: Response) {
        res.status(200).json({ message: 'Server is up and running!' });
    }
}