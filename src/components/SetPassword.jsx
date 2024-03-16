import {useState, useEffect} from 'react'
import Button from "./Button";
import FormHeader from "./FormHeader";
import Input from "./Input";
import ResponseResult from './ResponseResult';
import validateForm from '../helpers/validationForm';

/**
 * Component for setting a new password.
 * @component
 */
export default function SetPassword() {
    /**
      * State for storing information about validation errors.
      */
    const [wrongData, setwrongData] = useState({
        error: false,
        text: ''
    });

    /**
      * State for displaying a modal window with the result of the request.
      */
    const [responseModal, setResponseModal] = useState({
        show: false,
        message: '',
        isSuccessful: false
    });

    /**
      * Effect for hiding the modal window after a certain time.
      */
    useEffect(() => {
        const timer = setTimeout(() => {
            setResponseModal({ show: false, message: '', isSuccessful: false });
        }, 3500);
        return () => clearTimeout(timer);
    }, [responseModal]);
    
    /**
     * Form submit event handler.
     * @param {Event} e - Form submission event.
     */
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const firstpassword = formData.get('password'),
            secondPassword = formData.get('confPassword');

        // Password validation and password confirmation
        const validatePassword = validateForm(firstpassword, 'password');
        const validateConfirmPassword = validateForm(secondPassword, 'password');
        const equalPasswords = firstpassword == secondPassword;

        setwrongData({
            error: validatePassword.error || validateConfirmPassword.error || !equalPasswords,
            text:  validatePassword.text || 'passwords must be equal.' 
        }); 

        if (!validatePassword.error && !validateConfirmPassword.error && equalPasswords) {
            try {
                const response = await fetch('https://auth-qa.qencode.com/v1/auth/password-set', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "token": localStorage.getItem('token'),
                        "secret": "",
                        "password": firstpassword,
                        "password_confirm": secondPassword
                    })
                });

                if (response.status === 401) {
                    setResponseModal({ show: true, message: 'Authentificated Problem(', isSuccessful: false });
                } else if (response.status === 422) {
                    setResponseModal({ show: true, message: 'Wrong login data. Please check and try again!', isSuccessful: false });
                } else if (response.status === 200) {
                    const data = await response.json();
                    setResponseModal({ show: true, message: 'Authentificatin is Success!', isSuccessful: true });
                } else {
                    setResponseModal({ show: true, message: 'Unknown error occurred', isSuccessful: false });
                }
            } catch (error) {
                console.error('Error!:', error);
            }
        }
    }

    return (
        <div className='container'>
            <FormHeader title="Create new Password"/>
            <form className='form' onSubmit={handleSubmit}>
                <Input placeholder="Password" type="password" name='password' label='Password' onFocus={() => setwrongData({ error: false, text: '' })}/>
                <Input placeholder="Password" type="password" name='confPassword' label='Confirm Password' onFocus={() => setwrongData({ error: false, text: '' })}/>
                <Button text="Reset Password" />
            </form>
            {wrongData.error && <p className='error_text'>{wrongData.text}</p>}
            {responseModal.show && <ResponseResult message={responseModal.message} isSuccessful={responseModal.isSuccessful} />}
        </div>    
    )
}