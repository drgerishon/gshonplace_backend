import styles  from '../../styles/Footer.module.scss'
const Footer = () => {
    const date = new Date();  // Create a new Date object
  const year = date.getFullYear();
  return (
    <div className={styles.footer}>
        &copy; {year} All Rights Reserved
    </div>
  )
}

export default Footer