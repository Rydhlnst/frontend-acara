import AuthLayout from '@/components/layouts/AuthLayout'
import Activation from '@/components/views/Auth/ActivationSuccess';
import authServices from '@/services/auth.service'
import React from 'react'

interface PropTypes {
    status: "success" | "failed";
}

const ActivationPage = (props: PropTypes) => {
  return (
    <AuthLayout title='Acara | Activation'>
        <Activation {...props}/>
    </AuthLayout>
  )
}

// 
export async function getServerSideProps(context: {query: {code: string}}) {
    try {
        const result = await authServices.activation({code: context.query.code});
        if (result.data.data) {
            return {
                props: {
                    status: "Success"
                },
            };
        } else {
            return {
                props: {
                    status: "Failed"
                }
            }
        }
    } catch (error) {
        return {
            props: {
                status: "Failed"
            }
        }
    }
} 

export default ActivationPage