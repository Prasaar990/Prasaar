import styles from "../../styles/Features.module.css";
import Feature from "./Feature";

export default function Features() {
  return (
    <div className={styles.features}>
      <Feature
        title={"Unified Platform"}
        list={["first", "second", "third", "fourth"]}
      />
      <Feature
        title={"Unified Platform"}
        list={["first", "second", "third", "fourth"]}
        side={"rowReverse"}
      />
      <Feature
        title={"Unified Platform"}
        list={["first", "second", "third", "fourth"]}
      />
    </div>
  );
}
