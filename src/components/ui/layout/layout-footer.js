import { Fragment } from "react";
import styles from "./layout-footer.module.css";

function LayoutFooter() {
  return (
    <Fragment>
      <div className={styles.footer_margin}></div>
      <ul className={styles.footer}>
        <li>
          <h1>Logo</h1>
        </li>
        <li> Copyright 2022. MS All rights reserved.</li>
      </ul>
    </Fragment>
  );
}
export default LayoutFooter;
