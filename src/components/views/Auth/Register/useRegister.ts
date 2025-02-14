import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

// Membuat schema untuk pengecekan Objek
const registerSchema = yup.object().shape({
    // Required = Harus diisi
    fullName: yup.string().required("Input your fullname"),
    userName: yup.string().required("Input your username"),
    email: yup.string().email("Email format not valid").required("Input your email"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Input your password"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), ""], "Password not match").required("Input your password confirmation"),
})

const useRegister = () => {
    const router = useRouter();
    const [visiblePassword, setVisiblePassword] = useState({
        password: false,
        confirmPassword: false
    });

    const handleVisiblePassword = (key: "password" | "confirmPassword") => {
        setVisiblePassword({
            ...visiblePassword,
            [key]: !visiblePassword[key]
        });
    };

    const {control, register, handleSubmit, formState: {errors}, reset, setError} = useForm({
        // Menggunakan schema Register tadi
        resolver: yupResolver(registerSchema)
    })

    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload);
        return result
    };

    const {
        // Mutate = Proses untuk mengirim data ke server, dan didefiniskan menjadi mutateRegister agar lebih mudah
        mutate: mutateRegister, isPending: isPendingRegister} = useMutation({
        mutationFn: registerService,
        // Jika error
        onError(error) {
            setError("root", {
                message: error.message
            })
        },
        // Jika berhasil
        onSuccess: () => {
            router.push("/auth/register/success");
            reset();
        }

    });

    const handleRegister = (data: IRegister) => mutateRegister(data);

    return {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors,
    }
}

export default useRegister;
