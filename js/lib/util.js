import luri from "../../../core/js/lib/luri.js";

/**
 * A utility function that allows you to modify the DOM *in style*.
 * 
 * if add and remove are present then replaces remove with add  
 * if add and parent are present then appends add to parent  
 * if only remove is present then removes remove from its parent
 * if add, remove, and parent are present then insert add before remove in parent
 * 
 * if add or remove implement Animatable their respective animations
 * will get called
 * 
 * @param {HTMLElement | null} add 
 * @param {HTMLElement | null} remove 
 * @param {HTMLElement | null} parent 
 * @returns {Promise} Resolves when all animations are over
 */
export async function smoothie(add, remove, parent) {
  if (add === remove) {
    return add;
  }
  if (remove && !parent) {
    if (remove.outx) {
      await remove.outx(add);
    } else {
      await animate(remove, "fadeOut");
    }
  }
  if (add) {
    if (remove) {
      if (parent) {
        add = luri.insert(add, parent, remove);
      } else {
        add = luri.replace(remove, add);
      }
    } else {
      add = luri.append(add, parent);
    }
    if (add.inx) {
      await add.inx(remove);
    } else {
      await animate(add, "fadeIn");
    }
  } else {
    remove.remove();
  }
  return add || remove;
}

/**
 * Run an animation on element by adding animatecss classes.
 * @param {HTMLElement} element 
 * @param {string} animation 
 */
export function animate(element, animation) {
  if (!animation) {
    return Promise.resolve(element);
  }

  if (element.classList.contains("animate__animated")) {
    return element.animationPromisex;
  }

  let anim = "animate__" + animation;
  element.classList.add("animate__animated", anim);

  return element.animationPromisex = new Promise(resolve => {
    element.onanimationend = () => {
      element.onanimationend = null;
      element.classList.remove("animate__animated", anim)
      resolve(element);
    };
  });
}

/**
 * Generate or get current location hash string
 * @param {*} path 
 * @param {*} query 
 * @returns {string} A hash string without leading #
 */
export function lochash(path = location.hash.substring(1), query) {
  if (query) {
    return path + ":" + JSON.stringify(query);
  }
  return path;
}

export function navigate(path, query) {
  location.hash = lochash(path, query);
}

/**
 * Globalize luri helper functions
 */
luri.helpers(window);

/**
 * Swaps classes on an element based on a condition.
 * 
 * @param {HTMLElement} element 
 * @param {bool} condition 
 * @param {string} a classes to be added if condition is true or removed if condition is false
 * @param {string} b classes to be removed if condition is true or added if condition is false
 */
export function swap(element, condition, a = "", b = "") {
  if (b)
    element.classList[condition ? "remove" : "add"](...b.split(" "));
  element.classList[condition ? "add" : "remove"](...a.split(" "));
}
