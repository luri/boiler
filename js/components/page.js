import Content from "../../../core/js/components/content.js";
import Animatable from "../mixins/animatable.js";

/**
 * @extends Content
 */
export default class Page extends Animatable(Content) {

  titlex() {
    return this.idx().replace("Page", "").replace(":", " - ");
  }

}