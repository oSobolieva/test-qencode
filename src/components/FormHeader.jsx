import logo from './assets/logo.png'

/**
  * Form header component.
  * @component
  * @param {Object} props - Component properties.
  * @param {string} props.title - Title of the form.
  * @returns {JSX.Element} Form header component.
*/
export default function FormHeader({ title }) {
    
    return (
        <>
            <div className="container__logo">
                <img src={logo} alt = "logo" />
            </div>
            <p className='container__title'>{title}</p>
        </>
    )
}