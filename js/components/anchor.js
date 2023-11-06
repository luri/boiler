import { Component, register } from "../../../core/js/lib/luri.js";

export default class Anchor extends Component(HTMLAnchorElement) {
  
  static parentx() {
    return "a";
  }

  propsx() {
    return {
      class: "anchor-default"
    }
  }

  ninjax() {
    return true;
  }

  constructor(text, url, props = {}) {
    props.html = text;
    props.href = url;
    super(props);
  }

}
register(Anchor);
