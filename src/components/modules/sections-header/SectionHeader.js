import styles from "./SectionHeader.module.css";

function SectionHeader({ title, desc }) {
  return (
    <div className={styles.section_header_container}>
      <h2 className={styles.section_title}> {title} </h2>
      <span className={styles.section_desc}>{desc}</span>
    </div>
  );
}

export default SectionHeader;
