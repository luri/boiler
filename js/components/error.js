import { Component, register } from "../../../core/js/lib/luri.js";
import Animatable from "../mixins/animatable.js";

export default class ErrorView extends Animatable(Component()) {

  titlex() {
    return "Error";
  }

  constructx(props) {
    return {
      class: "flex flex-col items-center text-center",
      html: [
        {
          class: "relative inline-block p-16 m-10 bg-sec-800 rounded-full text-6xl text-fail-700 font-bold border-fail-800 border-solid border-2 shadow-lg",
          html: [
            {
              class: "absolute left-0 top-0 w-full h-full flex justify-center items-center",
              html: "!"
            },
          ]
        },
        H1({
          class: "text-2xl font-bold px-6 py-3",
          html: "Error"
        }),
        P({
          class: "text-sec-500",
          html: props.message
        }),
      ]
    }
  }
}
register(ErrorView);
