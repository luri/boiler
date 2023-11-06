import luri, { register } from "../../../../core/js/lib/luri.js";
import { lochash, navigate } from "../../lib/util.js";
import AppContentRoot from "./app-content-root.js";

export default class Application extends AppContentRoot {

  connectedCallback() {
    // navigate when mounted
    this.onHashChange();
  }
  
  onHashChange() {
    super.navigatex(lochash());
  }

  /**
   * This performs navigation indirectly by changing
   * the location hash, so it returns nothing
   * @param {*} route 
   * @param {*} query 
   * @returns {undefined}
   */
  navigatex(route, query) {
    navigate(route, query);
  }

  getContentRootElementx() {
    return this.children[0];
  }

  loadx(module) {
    return import(module);
  }

  resolvex(path) {
    return "../pages" + path + ".js"
  }

  titlex(title = "Anonymous") {
    document.title = title;
  }

  renderx(content) {
    return super.renderx(content).then(content => {
      try {
        this.titlex(content.titlex());
      } catch (e) {
        this.titlex();
      }
      return content;
    });
  }

  constructx() {
    return {
      class: "flex flex-col h-full w-full bg-sec-900 text-sec-500 overflow-y-auto overflow-x-hidden"
    };
  }
}

register(Application);

/**
 * Global navigation event listener
 */
window.onhashchange = function (event) {
  luri.emit("HashChange", window.location.hash.substring(1), event);
}
