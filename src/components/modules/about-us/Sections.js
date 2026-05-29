import styles from "./Sections.module.css";

function Sections({ title, img, revers, children }) {
  const sectionClass = `
    ${styles["abous-us-sections"]}
    ${revers ? styles["abous-us-sections-revers"] : ""}
  `.trim();

  return (
    <section className={sectionClass}>
      {revers ? (
        <>
          {/* about-us-left */}
          <div
            className={`${styles["abous-us-sections-left"]} ${styles["abous-us-img"]}`}
          >
            <img src={img} alt="" />
          </div>

          {/* about-us-right */}
          <div
            className={`${styles["abous-us-sections-right"]} ${styles["abous-us-text"]}`}
          >
            <h3 className={styles["abous-us-sections-title"]}>{title}</h3>

            <p className={styles["abous-us-sections-desc"]}>{children}</p>
          </div>
        </>
      ) : (
        <>
          {/* about-us-right */}
          <div
            className={`${styles["abous-us-sections-right"]} ${styles["abous-us-text"]}`}
          >
            <h3 className={styles["abous-us-sections-title"]}>{title}</h3>

            <p className={styles["abous-us-sections-desc"]}>{children}</p>
          </div>

          {/* about-us-left */}
          <div
            className={`${styles["abous-us-sections-left"]} ${styles["abous-us-img"]}`}
          >
            <img src={img} alt="" />
          </div>
        </>
      )}
    </section>
  );
}

export default Sections;
