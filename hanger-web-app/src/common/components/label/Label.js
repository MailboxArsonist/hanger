import styles from './Label.module.css'

const Label = ({htmlFor, children}) => (
  <label className={styles.label} htmlFor={htmlFor}>
    { children }
  </label>
);

export default Label;