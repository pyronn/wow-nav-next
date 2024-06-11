import {NextRequest, NextResponse} from "next/server";
import {userService} from "@/lib/auth";
import {ErrCode} from "@/lib/codes";


export async function POST(req: NextRequest) {
    const data = await req.json()
    const {username, email, password} = data

    const emailExist = await userService.checkEmailExist(email)
    if (emailExist) {
        return NextResponse.json({msg: 'email already exists', code: ErrCode.EmailAlreadyExist})
    }

    const usernameExist = await userService.checkUsernameExist(username)
    if (usernameExist) {
        return NextResponse.json({msg: 'name already exists', code: ErrCode.UsernameAlreadyExist})
    }

    try {
        const user = await userService.register(username, email, password)
    } catch (e) {
        console.error(e)
        return NextResponse.json({msg: e, code: ErrCode.Unknown})
    }

    return NextResponse.json({msg: 'ok', code: 0})
}
