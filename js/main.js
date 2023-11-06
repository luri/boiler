import Application from "./components/roots/app.js";
import { smoothie } from "./lib/util.js";

smoothie(new Application, document.body.firstElementChild);
