import bcrypt from 'bcrypt'

const saltRounds = 10

export async function hashPassword(password: string) {
    const hashedPass = await bcrypt.hash(password, saltRounds)
    return hashedPass
}

export async function checkPassword(password: string, hashedPassword: string) {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
}
