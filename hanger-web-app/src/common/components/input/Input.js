import styles from './Input.module.css'

export default function Input({placeholder, onChange, value, id, type = "text"}) {
  return (
    <input 
      id={id} 
      className={styles.input} 
      onChange={onChange} 
      placeholder={placeholder} 
      value={value}
      type={type}
    />
  )
}