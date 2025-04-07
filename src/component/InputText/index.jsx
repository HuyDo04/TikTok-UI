import PropTypes from "prop-types";
import styles from "./InputText.module.scss";
function InputText({
  type = "text",
  name,
  register = () => ({}),
  message = "",
}) {
  return (
    <>
      <input type={type} {...register(name)} className={styles.input} />
      <br />
      {message && <span className={`${styles.error}`}>{message}</span>}
      <br />
    </>
  );
}

InputText.protoTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
  register: PropTypes.func,
};

export default InputText;
