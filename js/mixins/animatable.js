import { animate } from "../lib/util.js";

export default function Animatable(base) {
  
  return class Animatable extends base {
    animinx(prev) {
      return "fadeIn";
    }

    animoutx(next) {
      return "fadeOut";
    }

    inx(prev) {
      return this.animatex(prev, this.animinx(prev));
    }

    outx(next) {
      return this.animatex(next, this.animoutx(next))
    }

    animatex(element, animation) {
      if (this === element) {
        return Promise.resolve(this)
      }

      return animate(this, animation);
    }
  }
}