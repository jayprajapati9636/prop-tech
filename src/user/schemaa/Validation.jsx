import *as Yup from "yup";
export const singUpSchema =Yup.object({

    Name:Yup.string().max(15).required("Please Enter Your Name "),
    Email:Yup.string().email().required("Please enter Your Email"),
    Password:Yup.string().max(8).required("Please enter Your Password"),
    confirm_Password:Yup.string().max(8).required()
})