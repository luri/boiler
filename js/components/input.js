import * as core from "../../../core/js/components/input.js";
import { Component, register } from "../../../core/js/lib/luri.js";

export class Input extends core.Input {

  propsx() {
    return Object.assign(super.propsx(), {
      class: "input-control"
    })
  }
  
}
register(Input);

export class Select extends core.Select {

  propsx() {
    return {
      class: "input-control"
    }
  }
  
}
register(Select);

export class Textarea extends core.Textarea {

  propsx() {
    return {
      class: "input-control"
    }
  }

}
register(Textarea);


export class Checkbox extends core.Checkbox {

  static inputClassx = Input;

  constructinputx(props) {
    return Object.assign({
      class: "checkbox-input"
    }, super.constructinputx(props));
  }

  constructlabelx(props) {
    return Object.assign({
      class: "checkbox-control"
    }, super.constructlabelx(props));
  }
}
register(Checkbox);


export class Radio extends core.Radio {
  
  static inputClassx = Input;

  constructinputx(props) {
    return Object.assign({
      class: `checkbox-input rounded-full`
    }, super.constructinputx(props));
  }

  constructlabelx(props) {
    return Object.assign({
      class: "checkbox-control"
    }, super.constructlabelx(props));
  }
}
register(Radio);

export class Submit extends Input {

  constructor(value, name, props) {
    super(name, "submit", value, props);
  }

  propsx() {
    return {
      class: `button-prim`
    }
  }
}
register(Submit);

export class Button extends Component(HTMLButtonElement) {

  static parentx() {
    return "button"
  }

  ninjax() {
    return true;
  }

  propsx(props) {
    let className = props.primary ? "button-prim" : "button-sec";
    if (props.block) {
      className += " block w-full";
    }

    delete props.primary;
    delete props.block;

    return {
      type: "button",
      class: className
    };
  }
}
register(Button);