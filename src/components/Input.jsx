import eye from './assets/password-eye.png'

/**
 * Reusable component with input tag.
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.placeholder - Tooltip text for the input field.
 * @param {string} props.type - Input field type.
 * @param {string} [props.name=props.type] - Input field name attribute.
 * @param {string} [props.label=''] - The text of the input field label.
 * @param {Object} [props...] - Other properties.
 */
export default function Input({ placeholder, type, name = type, label = '', ...props }) {
    // Defining a class for the "eye" icon
    const showIcon = name == 'password' || name == 'confPassword';
    const cssIcon = label == '' ? 'form__input_eye' : 'form__input_eye_text'

    /**
    * Function to show/hide the password when you click on the "eye" icon.
    */
    function showPassword() {
        const input = document.getElementsByName(name);

        if (input[0].getAttribute('type') == 'password') {
            input[0].setAttribute('type', 'text');
        } else {
            input[0].setAttribute('type', 'password');
        }
    }

    return (<label className = 'form__label'>
            {label}
            <input className='form__input' placeholder={placeholder} type={type} name={name} {...props} />
            {showIcon && <img src={eye} className={cssIcon} onClick={showPassword} /> }
        </label>
    );
}