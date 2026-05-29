import Link from "next/link";
import styles from "./ShowAll.module.css";

function ShowAll({ href='/' }) {
  return (
    <Link className={styles.show_all} href={'/'}>
      مشاهده همه
      <img src="./icons/Vector (1).png" alt="" />
    </Link>
  );
}

export default ShowAll;
