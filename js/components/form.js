import * as core from "../../../core/js/components/form.js";
import luri, { register } from "../../../core/js/lib/luri.js";
import loader from "../lib/loader.js";

export default class Form extends core.default {

  loaderx() {
    this.classList.add("relative");

    let classes = "form-loader text-prim-500 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-sec-800 opacity-75";

    return luri.append(loader(32, classes), this);
  }

}
register(Form);