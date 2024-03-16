import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import googleLogo from './assets/google-logo.png'
import gitLogo from './assets/github-logo.png'
import validateForm from "../helpers/validationForm";
import FormHeader from "./FormHeader";
import ResponseResult from "./ResponseResult";

/**
  * Login form component.
  * @component
  * @param {Object} props - Component properties.
  * @param {Function} props.showResetPasswordForm - Function for displaying the password reset form.
  * @returns {JSX.Element} Login form component.
  */
export default function LoginForm({showResetPasswordForm}) {
    const [showPassword, setShowPassword] = useState(false);
    const [wrongData, setwrongData] = useState({
        error: false,
        text: ''
    });
    const [responseModal, setResponseModal] = useState({
        show: false,
        message: '',
        isSuccessful: false
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setResponseModal({ show: false, message: '', isSuccessful: false });
        }, 3500);
        return () => clearTimeout(timer);
    }, [responseModal]);

    /**
    * Form submission event handler.
    * @param {Event} e - Form submission event.
    */
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const validateEmail = validateForm(formData.get("email"), "email");
        const validatePassword = validateForm(formData.get("password"), "password");

        setwrongData({
            error: validateEmail.error || validatePassword.error,
            text: validateEmail.text || validatePassword.text
        }); 

        if (!validateEmail.error && !validatePassword.error) {
            try {
                const response = await fetch('https://auth-qa.qencode.com/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            "email": formData.get("email"),
                            "password": formData.get("password"),
                        })
                });

                if (response.status === 401) {
                    setResponseModal({ show: true, message: 'Authentificated Problem(', isSuccessful: false });
                } else if (response.status === 422) {
                    setResponseModal({ show: true, message: 'Wrong login data. Please check and try again!', isSuccessful: false });
                } else if (response.status === 200) {
                    const data = await response.json();
                    localStorage.setItem('token', data["access_token"]);
                    setResponseModal({ show: true, message: 'Authentificatin is Success!', isSuccessful: true });
                } else {
                    setResponseModal({ show: true, message: 'Unknown error occurred', isSuccessful: false });
                }

            } catch (error) {
                console.error('Error!:', error.message);

            }
        }
    }

    /**
    * Focus event handler for the email input field.
    */
    function handleEmailFocus() {
        setShowPassword(true);
        setwrongData({ error: false, text: '' })
    }

    return (
        <div className = 'container'>
            <FormHeader title="Log in to your account"/>
            <div className = 'flex_column'>
                <Button css="form__button_with_icons" text='Google' isIcon='true' icon={googleLogo} />
                <Button css="form__button_with_icons" text='Github' isIcon='true' icon={gitLogo} />
            </div>
            <div className = 'flex_column'>
                <div className = 'div_decoration'></div>
                <p className = 'p_decoration'>or</p>
                <div className = 'div_decoration'></div>
            </div>
            <form className='form' onSubmit={handleSubmit}>    
                <Input placeholder="Work email" type="email" onFocus={handleEmailFocus}/>
                {showPassword && <div className='div_password'> 
                    <Input placeholder="Password" type="password" name='password' onFocus={() => setwrongData({ error: false, text: '' })} />
                    <a onClick = {showResetPasswordForm} >Forgot your password?</a>
                    </div>}
                <Button text="Log in to Qencode" />
                {wrongData.error && <p className = 'error_text'>{wrongData.text}</p>}
                <div className = 'div_signup'>
                    <p>Is your company new to Qencode?</p>
                    <a>Sign up</a>
                </div>
            </form>
            {responseModal.show && <ResponseResult message={responseModal.message} isSuccessful={responseModal.isSuccessful} />}
        </div>     
    )
}