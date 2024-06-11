import {PrismaClient} from "@prisma/client";
import {checkPassword, hashPassword} from "@/lib/encrypt";

const prisma = new PrismaClient()

export const userService = {
    authenticate,
    register,
    checkEmailExist,
    checkUsernameExist
}

async function authenticate(username: string, password: string) {
    console.log('authenticate', username, password)
    const user = await prisma.user.findUnique({
        where: {
            email: username,
        }
    })
    if (user === null) {
        return null
    } else {
        console.log(user)
        const match = await checkPassword(password, user.password ?? "")
        if (!match) {
            return null
        }
        console.log("auth success")
        return {
            id: user.id,
            username: user.name,
            name: user.name,
            email: user.email,
        }
    }
}

async function register(name: string, email: string, password: string) {
    // 检查email
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (existingUser) {
        console.error('email already exists', email)
        throw new Error('email already exists',)
    }

    const hashedPassword = await hashPassword(password)

    const u = {
        name: name,
        email: email,
        password: hashedPassword
    }

    const user = await prisma.user.create({
        data: u
    })
    return user
}

async function checkEmailExist(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (user) {
        return true
    } else {
        return false
    }
}

async function checkUsernameExist(username: string) {
    const user = await prisma.user.findFirst({
        where: {
            name: username
        }
    })
    if (user) {
        return true
    } else {
        return false
    }
}

export type User = {
    id?: string | null;
    name?: string | null;
    email?: string | null;
}

