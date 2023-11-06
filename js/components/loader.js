import { Component, register } from "../../../core/js/lib/luri.js";
import loader from "../lib/loader.js";
import Animatable from "../mixins/animatable.js";

export default class Loader extends Animatable(Component()) {
  
  titlex() {
    return "Loading..";
  }

  ninjax() {
    return true;
  }

  constructx(props = {}) {
    return {
      class: "flex justify-center items-center my-24",
      html: loader(props.size, props.classes, props.type)
    };
  }

}

register(Loader);
