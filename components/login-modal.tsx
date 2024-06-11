import {Modal, ModalContent, ModalHeader} from "@nextui-org/modal";
import {ModalBody, ModalFooter} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {Checkbox} from "@nextui-org/checkbox";
import {Link} from "@nextui-org/link";
import {Button} from "@nextui-org/button";
import {AiOutlineLock, AiOutlineMail, AiOutlineUser} from "react-icons/ai";
import {Divider} from "@nextui-org/divider";
import {FormEvent, useState} from "react";
import {signIn} from "next-auth/react";
import {toast} from "sonner";

type LoginModalProps = {
    isOpen: boolean
    onOpenChange: () => void
}

export const LoginModal = ({isOpen, onOpenChange}: {
    isOpen: boolean
    onOpenChange: () => void
}) => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        email: "",
        isRemember: false,
    })

    const [isRegistering, setIsRegistering] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const [isRegister, setIsRegister] = useState(false)

    const handleUsernameChange = (value: string) => {
        setInputs(values => ({
            ...values,
            ['username']: value
        }))
    }
    const handlePasswordChange = (value: string) => {
        setInputs(values => ({
            ...values,
            ['password']: value
        }))
    }

    const handleEmailChange = (value: string) => {
        setInputs(values => ({
            ...values,
            ['email']: value
        }))
    }

    const handleLogonSubmit = async (event: FormEvent) => {
        event.preventDefault()

        setIsLoggingIn(true)
        const {email, password} = inputs
        setInputs({
            username: "",
            password: "",
            email: "",
            isRemember: false,
        })
        await signIn("credentials", {
            username: email,
            password: password,
            callbackUrl: '/'
        }).then(res => {
            setIsLoggingIn(false)
        })
    }

    const handleRegisterSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setIsRegistering(true)
        const {email, username, password} = inputs
        setInputs({
            username: "",
            password: "",
            email: "",
            isRemember: false,
        })
        await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            })
        }).then(res => res.json()).then(data => {
            setInputs(values => ({...values, ['password']: "", ['username']: "",}))
            setIsRegistering(false)
            if (data.code === 0) {
                setIsRegister(false)
                toast.success('注册成功')
            } else {
                toast.error(data.msg)
            }
        }).catch(e => {
            console.error(e)
            setIsRegistering(true)
            toast.error(e.toString())
        })
    }

    const handleLogin = () => {
        const loginSubmit = document.getElementById('loginSubmit')
        loginSubmit?.click()
    }

    const handleRegister = () => {
        const registerSubmit = document.getElementById('registerSubmit')
        registerSubmit?.click()
    }
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                        <ModalBody>
                            <div>
                                provider
                            </div>
                            <Divider title={'login with email'}/>
                            {isRegister ? (
                                <form onSubmit={handleRegisterSubmit}>
                                    <div>
                                        <Input
                                            endContent={
                                                <AiOutlineUser size={24}
                                                               className={'text-default-400 text-2xl pointer-events-none'}/>
                                            }
                                            isDisabled={isRegistering}
                                            label="Name"
                                            placeholder="Enter your name"
                                            variant="bordered"
                                            value={inputs.username}
                                            onValueChange={handleUsernameChange}
                                        />
                                        <Input
                                            autoFocus
                                            isDisabled={isRegistering}
                                            endContent={
                                                <AiOutlineMail
                                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                            }
                                            label="Email"
                                            placeholder="Enter your email"
                                            variant="bordered"
                                            value={inputs.email}
                                            onValueChange={handleEmailChange}
                                        />
                                        <Input
                                            endContent={
                                                <AiOutlineLock size={24} className={'text-default-400'}/>
                                            }
                                            isDisabled={isRegistering}
                                            label="Password"
                                            placeholder="Enter your password"
                                            type="password"
                                            variant="bordered"
                                            value={inputs.password}
                                            onValueChange={handlePasswordChange}
                                        />
                                        <button id={'registerSubmit'} type={'submit'} hidden={true}></button>
                                        <div>
                                            已经有账号？去<Link href={""} onClick={(e) => {
                                            e.preventDefault()
                                            setIsRegister(false)
                                        }}>登录</Link>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleLogonSubmit}>
                                    <div>
                                        <Input
                                            autoFocus
                                            isDisabled={isLoggingIn}
                                            endContent={
                                                <AiOutlineMail
                                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                            }
                                            label="Email"
                                            placeholder="Enter your email"
                                            variant="bordered"
                                            value={inputs.email}
                                            onValueChange={handleEmailChange}
                                        />
                                        <Input
                                            endContent={
                                                <AiOutlineLock size={24} className={'text-default-400'}/>
                                            }
                                            isDisabled={isLoggingIn}
                                            label="Password"
                                            placeholder="Enter your password"
                                            type="password"
                                            variant="bordered"
                                            value={inputs.password}
                                            onValueChange={handlePasswordChange}
                                        />
                                        <div className="flex py-2 px-1 justify-between">
                                            <Checkbox
                                                classNames={{
                                                    label: "text-small",
                                                }}
                                            >
                                                Remember me
                                            </Checkbox>
                                            <Link color="primary" href="#" size="sm">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <button id={'loginSubmit'} type={'submit'} hidden={true}></button>
                                        <div>
                                            还没有账号？去<Link href={"#"} onClick={(e) => {
                                            e.preventDefault()
                                            setIsRegister(true)
                                        }}>注册</Link>
                                        </div>
                                    </div>
                                </form>
                            )}

                        </ModalBody>
                        <ModalFooter>

                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            {isRegister ? (
                                <Button color="primary" onPress={handleRegister}>
                                    Sign up
                                </Button>
                            ) : (
                                <Button color="primary" onPress={handleLogin}>
                                    Sign in
                                </Button>
                            )}

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
