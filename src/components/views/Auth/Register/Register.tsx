import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Input, Spinner} from "@heroui/react";
import Image from 'next/image'
import Link from "next/link";
import React from 'react'
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {Button, ButtonGroup} from "@heroui/button";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
    const { visiblePassword, handleVisiblePassword, control, handleSubmit, handleRegister, errors, isPendingRegister } = useRegister();
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
                {errors.root && (
                    <p className="mb-2 font-medium text-danger">{errors?.root?.message}</p>
                )}
                <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleRegister)}>
                    {/* Basic penggunaan React Hook Form */}
                    <Controller name="fullName" control={control} render={({field}) => (
                        // isInvalid dan errorMessage digunakan untuk menampilkan pesan error jika input tidak sesuai dengan yang diinginkan
                        <Input {...field} type="text" label="Fullname" variant="bordered" autoComplete="off"  isInvalid={errors.fullName !== undefined} errorMessage={errors.fullName?.message}/>
                    )}/>
                    <Controller name="userName" control={control} render={({field}) => (
                        <Input {...field} type="text" label="Username" variant="bordered" autoComplete="off" isInvalid={errors.userName !== undefined} errorMessage={errors.userName?.message}/>
                    )}/>
                    <Controller name="email" control={control} render={({field}) => (
                        <Input {...field} type="text" label="Email" variant="bordered" autoComplete="off" isInvalid={errors.email !== undefined} errorMessage={errors.email?.message}/>
                    )}/>
                    {/* 
                        Jika visiblePassword.password bernilai true, maka tampilkan input type text, jika tidak tampilkan input type password, dimana text akan menunjukkan password yang diinputkan, sedangkan password akan menyembunyikan password yang diinputkan
                    */}
                    <Controller name="password" control={control} render={({field}) => (
                        <Input {...field} type={visiblePassword.password ? ("text") : ("password")} label="Password" variant="bordered" autoComplete="off" endContent={
                            <button className="focus:outline-none" type="button" onClick={() => handleVisiblePassword("password")}>{
                                visiblePassword.password ? (<FaEye className="text-xl text-default-400 pointer-events-none"/>) : (<FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>)
                            }</button>
                        } isInvalid={errors.password !== undefined} errorMessage={errors.password?.message}/>
                    )}/>
                    <Controller name="confirmPassword" control={control} render={({field}) => (
                        <Input {...field} type={visiblePassword.confirmPassword ? ("text") : ("password")} label="Password Confirmation" variant="bordered" autoComplete="off" endContent={
                            <button className="focus:outline-none" type="button" onClick={() => handleVisiblePassword("confirmPassword")}>{
                                visiblePassword.confirmPassword ? (<FaEye className="text-xl text-default-400 pointer-events-none"/>) : (<FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>)
                            }</button>
                        } isInvalid={errors.confirmPassword !== undefined} errorMessage={errors.confirmPassword?.message}/>
                    )}/>
                    <Button color="danger" size="lg" type="submit">
                        {/* Jika isPendingRegister true akan mengeluarkan spinner*/}
                        {isPendingRegister ? (<Spinner color="white" size="sm"/>): ("Register")}
                    </Button>
                </form>
            </CardBody>
        </Card>
    </div>
  )
}

export default Register