
/**
  * Button component.
  * @component
  * @param {Object} props - Component properties.
  * @param {string} [props.css="button form__button_theme_blue"] - Classes for styling the button (blue color by default).
  * @param {string} props.text - Button text.
  * @param {Function} [props.onClickFn] - Callback function that will be called when the button is clicked.
  * @param {string} [props.isIcon='false'] - Flag indicating the presence of an icon on the button (default is "false").
  * @param {string} [props.icon] - Path to the icon image.
  * @returns {JSX.Element} Button component.
  */
export default function Button({ css = "button form__button_theme_blue", text, onClickFn, isIcon = 'false', icon }) {
    /**
    * Defining a class for a button depending on the presence of an icon.
    */
    const cssClass = isIcon == 'true' ? css : 'button ' + css;

    return <button className={cssClass} onClick={onClickFn}>{isIcon == 'true' ? <img src={icon}/> : ''}{text}</button>
}