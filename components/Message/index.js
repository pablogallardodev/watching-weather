import { BsCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import styles from 'styles/footer.module.css'

const Message = ({ message }) => {
  const { view, error, text } = message
  return view && <div className={styles.message}>
  { error ? <BsFillXCircleFill color='#dc2626'/> : <BsCheckCircleFill color='#16a34a'/> }
  <label>{ text }</label>
</div>
}

export default Message;