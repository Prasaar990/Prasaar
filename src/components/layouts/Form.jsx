// import React from "react";
import styles from "../../styles/Form.module.css";

export default function Form() {
  return (
    <div className={styles.form_div}>
      <form className={styles.form_container} name="contact" netlify>
        <input type="hidden" name="form-name" value="contact" />
        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            id="email"
            className={styles.input_field}
            placeholder=" "
            required
          />
          <label htmlFor="email" className={styles.input_label}>
            Email address
          </label>
        </div>

        <div className={styles.grid_container}>
          <div className={styles.input_group}>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className={styles.input_field}
              placeholder=" "
              required
            />
            <label htmlFor="first_name" className={styles.input_label}>
              First name
            </label>
          </div>
          <div className={styles.input_group}>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className={styles.input_field}
              placeholder=" "
              required
            />
            <label htmlFor="last_name" className={styles.input_label}>
              Last name
            </label>
          </div>
        </div>
        <div className={styles.input_group}>
          <input
            type="tel"
            pattern="[0-9]{10}"
            name="phone"
            id="phone"
            className={styles.input_field}
            placeholder=" "
            required
          />
          <label htmlFor="phone" className={styles.input_label}>
            Phone number (1234567890)
          </label>
        </div>
        <div className={styles.input_group}>
          <input
            type="text"
            name="company"
            id="company"
            className={styles.input_field}
            placeholder=" "
            required
          />
          <label htmlFor="company" className={styles.input_label}>
            Company
          </label>
        </div>
        <button type="submit" className={styles.submit_button}>
          Submit
        </button>
      </form>
    </div>
  );
}
