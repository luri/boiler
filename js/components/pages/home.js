import { register } from "../../../../core/js/lib/luri.js";
import { delay } from "../../../../core/js/lib/util.js";
import Modal from "../modal.js";
import Page from "../page.js";


export default class HomePage extends Page {

  titlex() {
    return "A real ES6 SPA";
  }

  animinx() {
    return "zoomIn";
  }

  animoutx() {
    return "zoomOut";
  }

  // Make sure image is loaded so we don't get
  // a choppy animation on first load
  async datax() {
    // await delay(5000);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", reject);
      img.style = "filter: drop-shadow(0px 0px 10px #8a55c4);";
      img.src = "https://avatars0.githubusercontent.com/u/30749236";
    });
  }

  contentx(image) {
    return {
      class: "flex flex-col items-center mb-6",
      html: [
        {
          class: "w-8/12 md:w-full text-center",
          html: image
        },
      ]
    }
  }

}

register(HomePage);