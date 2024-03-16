import {useState, useEffect} from 'react'
import Button from "./Button";
import FormHeader from "./FormHeader";
import Input from "./Input";
import ResponseResult from './ResponseResult';
import validateForm from '../helpers/validationForm';

/**
  * Password reset form component.
  * @component
  * @param {Object} props - Component properties.
  * @param {Function} props.returnLoginForm - Callback function to return to the login form.
  * @param {Function} props.showSetPassword - Function to display the form for setting a new password.
  * @returns {JSX.Element} Password reset form component.
  */
export default function ResetPasswordForm({ returnLoginForm, showSetPassword }) {
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
      * Form submission handler.
      * @param {Event} e - Form submission event.
      */
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const validateEmail = validateForm(formData.get("email"), "email");

        setwrongData(validateEmail);

        if (!validateEmail.error) {
            try {
                const response = await fetch('https://auth-qa.qencode.com/v1/auth/password-reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": formData.get("email"),
                        "redirect_url": "https://auth-qa.qencode.com/password-set"
                    })
                });

                if (response.status === 401) {
                    setResponseModal({ show: true, message: 'Authentificated Problem(', isSuccessful: false });
                } else if (response.status === 422) {
                    setResponseModal({ show: true, message: 'Wrong login data. Please check and try again!', isSuccessful: false });
                } else if (response.status === 200) {
                    const data = await response.json();
                    setResponseModal({ show: true, message: 'Authentificatin is Success!', isSuccessful: true });
                    showSetPassword();
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
            <FormHeader title="Forgot Password?"/>
            <form className='form' onSubmit={handleSubmit}>
                <Input placeholder="Enter your email" type="email" onFocus={() => setwrongData({ error: false, text: '' })}/>
                <Button text="Send" />
                <Button text="Cancel" css="form__button_theme_gray" onClickFn={returnLoginForm} />
            </form>
            {wrongData.error && <p className='error_text'>{wrongData.text}</p>}
            {responseModal.show && <ResponseResult message={responseModal.message} isSuccessful={responseModal.isSuccessful} />}
        </div>    
    )
}