import "dotenv/config.js"
import {connectDB} from "./config/db.js"
import User from "./models/User.js"
import bcrypt from "bcrypt"
const tempPassword = "admin123";

async function registerAdmin() {
    try {
        const Admin_Email = process.env.ADMIN_EMAIL;
        console.log(Admin_Email)

        if(!Admin_Email){
            console.error("Missing Admin_Email env variable");
            process.exit(1);
        }

        await connectDB();
        const exisitingAdmin = await User.findOne({
            email : process.env.ADMIN_EMAIL
        });

        if(exisitingAdmin){
            console.log("User already exisr as role" , exisitingAdmin.role);
            process.exit(0);
        }

        const hashPassword = await bcrypt.hash(tempPassword , 10);
        const admin = await User.create({
            email : process.env.ADMIN_EMAIL,
            password : hashPassword,
            role : "ADMIN"
        });

        console.log("Admin user created");
        console.log("\nemail" , admin.email);
        console.log("password" , tempPassword);
        console.log("\nchange the password after login");
        process.exit(0);
    } catch (error) {
        console.error("seed failed" , error);
    }
}

registerAdmin();