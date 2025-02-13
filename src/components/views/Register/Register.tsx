import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Input} from "@heroui/react";
import Image from 'next/image'
import Link from "next/link";
import React from 'react'
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {Button, ButtonGroup} from "@heroui/button";

const Register = () => {
    const { visiblePassword, handleVisiblePassword } = useRegister();
  return (
    <div className='flex w-full items-center justify-center gap-10 lg:gap-20 flex-col lg:flex-row'>
        <div className='flex w-full lg:w-1/3 flex-col items-center justify-center gap-10'>
            <Image
                src={'/images/general/logo.svg'}
                alt='logo'
                width={180}
                height={180}
            />
             <Image
                src={'/images/illustrations/login.svg'}
                alt='logo'
                className="w-2/3 lg:w-full"
                width={1024}
                height={1024}
            />
        </div>
        <Card>
            <CardBody className="p-8">
                <h2 className="text-xl font-bold text-danger">Create Account</h2>
                <p className="text-small mb-4">Have an account?&nbsp;<Link href={"/login"} className="font-semibold text-danger-400">Login</Link></p>
                <form className="flex w-80 flex-col gap-4">
                    <Input type="text" label="Fullname" variant="bordered" autoComplete="off"/>
                    <Input type="text" label="Username" variant="bordered" autoComplete="off"/>
                    <Input type="text" label="Email" variant="bordered" autoComplete="off"/>
                    {/* 
                        Jika visiblePassword.password bernilai true, maka tampilkan input type text, jika tidak tampilkan input type password, dimana text akan menunjukkan password yang diinputkan, sedangkan password akan menyembunyikan password yang diinputkan
                    */}
                    <Input type={visiblePassword.password ? ("text") : ("password")} label="Email" variant="bordered" autoComplete="off" endContent={
                        <button className="focus:outline-none" type="button" onClick={() => handleVisiblePassword("password")}>{
                            visiblePassword.password ? (<FaEye className="text-xl text-default-400 pointer-events-none"/>) : (<FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>)
                        }</button>
                    }/>
                   <Input type={visiblePassword.confirmPassword ? ("text") : ("password")} label="Email" variant="bordered" autoComplete="off" endContent={
                        <button className="focus:outline-none" type="button" onClick={() => handleVisiblePassword("confirmPassword")}>{
                            visiblePassword.confirmPassword ? (<FaEye className="text-xl text-default-400 pointer-events-none"/>) : (<FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>)
                        }</button>
                    }/>
                    <Button color="danger" size="lg" type="submit">
                        Register
                    </Button>
                </form>
            </CardBody>
        </Card>
    </div>
  )
}

export default Register