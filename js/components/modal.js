
import { Component, register } from "../../../core/js/lib/luri.js";
import loader from "../lib/loader.js";
import { animate, smoothie } from "../lib/util.js";
import Animatable from "../mixins/animatable.js";
import { Button, Input } from "./input.js";

export default class Modal extends Component(Animatable(HTMLElement)) {

  /**
   * The element to which to append modals
   */
  static containerx = document.body;

  /**
   * A css background rule to apply to the curtain
   */
  static backgroundx = "rgba(0, 0, 0, 0.65)";


  /**
   * @typedef {{
   *  class?: string,
   *  unclosable?: boolean,
   *  pos?: null|"center"|"top"|"left"|"bottom"|"right"
   * }} ModalOptions 
   * @typedef {(ModalOptions & {
   *  input?: (resolve) => any,
   *  rejectOnClose?: boolean,
   *  type?: string,
   *  value?: string,
   *  attrs?: Object
   * })} ModalPromptOptions
   * @typedef {(ModalPromptOptions & {
   *  cancelText?: any,
   *  confirmText?: any
   * })} ModalConfirmOptions
   */
  /**
   * Open a new modal
   * @param {*} body
   * @param {ModalOptions} options
   * @returns {Promise<Modal>}
   */
  static openx(body, options) {
    return smoothie(new this(body, options), null, this.containerx).then(element => {

      element.tabIndex = 0;
      element.focus();

      return element;
    });
  }

  /**
   * Open a prompt modal
   * @param {*} body 
   * @param {ModalPromptOptions} options 
   */
  static promptx(body, options = {}) {
    let modal = null;

    return new Promise(async (resolve, reject) => {
      modal = await this.openx({
        html: [
          body,
          options.input ? options.input(resolve, reject) : {
            node: "form",
            html: new Input(null, options.type || "text", options.value || "", options.attrs || {}),
            onsubmit: event => {
              event.preventDefault();
              resolve(event.target.elements[0].value);
            }
          }
        ]
      }, options);

      modal.onx("ModalClosed", () => options.rejectOnClose ? reject() : resolve());
      // reuse options.input which has already been called
      if (options.input = modal.querySelector("input")) {
        options.input.focus();
      };
    }).finally(() => modal.closex());
  }

  /**
   * Open a confirmation modal
   * @param {*} body 
   * @param {ModalConfirmOptions} options 
   */
  static confirmx(body, options = {}) {
    if (typeof body === "string") {
      body = {
        html: {
          class: "text-center mb-4",
          html: body
        }
      };
    }

    return this.promptx(body, Object.assign({
      rejectOnClose: true,
      input: (resolve, reject) => {
        return {
          class: "flex justify-center",
          html: [
            [options.cancelText || "Cancel", "button-sec m-0 flex-1", reject],
            [options.confirmText || "Confirm", "button-prim m-0 flex-1", resolve]
          ].map(([def, classname, func]) => {
            return new Button({
              class: classname,
              html: def,
              onclick: func
            })
          })
        }
      }
    }, options))
  }

  static async loadx(promise, options) {
    let placeholder = null;
    let modal = await this.openx(
      {
        html: {
          class: "px-16 py-12",
          html: loader(),
          ref: e => placeholder = e
        }
      }, Object.assign({
        unclosable: true
      }, options)
    );

    return promise.then(result => {
      modal.classList.remove("t-800");

      return result ? smoothie(result, placeholder) : modal.closex();
    }).then(() => modal);
  }

  constructor(body, options) {
    super(Object.assign({
      body: body,
    }, options || {}));
  }

  closex() {
    if (!this.classList.contains("t-800") && this.parentNode === this.constructor.containerx) {
      this.emitx("ModalClosing");

      return smoothie(null, this).then(() => {
        this.emitx("ModalClosed");
      });
    }
  }

  onKeyUp(e) {
    if (e.which === 27) this.closex();
  }

  onClick(e) {
    if (e.target === this) this.closex();
  }

  // by default app navigation closes all modals
  onHashChange() {
    this.closex();
  }

  applyPosx(element, position = "center") {
    if (position === null) {
      return;
    }

    let [modalClass, bodyClass, animin, animout] = {
      center: ["justify-center items-center", "my-auto rounded", "", ""],
      bottom: ["justify-center items-end", "mt-auto w-full", "slideInUp", "slideOutDown"],
      top: ["justify-center items-start", "mb-auto w-full", "slideInDown", "slideOutUp"],
      left: ["justify-start items-center", "mr-auto h-full", "slideInLeft", "slideOutLeft"],
      right: ["justify-end items-center", "ml-auto h-full", "slideInRight", "slideOutRight"]
    }[position];

    element.className += " " + modalClass;
    element.firstChild.className += " " + bodyClass;

    // prevent scroll from showing during slide animations on bottom and right
    element.classList.remove("overflow-auto");
    element.classList.add("overflow-hidden");
    animate(element.firstChild, animin).then(() => {
      element.className = element.className.replace("overflow-hidden", "overflow-auto");
    });
    setTimeout(() => {
      element.onx("ModalClosing", () => {
        element.classList.remove("overflow-auto");
        element.classList.add("overflow-hidden");
        animate(element.firstChild, animout);
      })
    });
  }

  constructx(props) {
    if (typeof props.body === "string") {
      props.body = { html: props.body };
    }

    return {
      class: (props.class || "fixed top-0 left-0 w-full h-full z-50 flex") + (props.unclosable ? " t-800" : ""),
      style: {
        "background": props.background || this.constructor.backgroundx
      },
      html: props.body.constructor === Object ? Object.assign({
        class: "bg-sec-800 border border-sec-700 px-6 py-4"
      }, props.body) : props.body,
      ref: e => this.applyPosx(e, props.pos)
    }
  }

}
register(Modal);
