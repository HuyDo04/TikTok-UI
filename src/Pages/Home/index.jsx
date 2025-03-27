import Button from "@/component/Button";
import config from "@/config";

import styles from "./Home.module.scss";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Button
        size="medium"
        icon={faChevronCircleRight}
        href={config.routes.users}
      >
        Click me 1!
      </Button>
      <Button
        size="small"
        icon={faChevronCircleRight}
        primary
        rounded
        // disabled
        loading
        className={styles.btnHome}
        onClick={() => alert("Hello")}
      >
        Click me 2!
      </Button>
      <Button size="large" icon={faChevronCircleRight} secondary>
        Click me 3!
      </Button>
      <Button size="large" icon={faChevronCircleRight} rounded>
        Click me 4!
      </Button>
    </div>
  );
}

export default Home;
