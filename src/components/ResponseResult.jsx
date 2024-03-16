import { createPortal } from 'react-dom';

/**
  * Component for displaying the result of an operation.
  * @component
  * @param {Object} props - Component properties.
  * @param {string} props.message - Message to display.
  * @param {boolean} props.isSuccessful - Flag of the success of the operation.
  * @returns {JSX.Element} Component to display the result of the operation.
  */
export default function ResponseResult({ message, isSuccessful }) {
    /**
      * CSS class for styling the component depending on the success of the operation.
      * @type {string}
      */
    const cssClass = isSuccessful ? ' response successful_response' : 'response error_response'

    return createPortal(<div className={cssClass}><p>{message}</p></div>, document.getElementById('responses'));
}