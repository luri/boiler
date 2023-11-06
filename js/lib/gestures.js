import "https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js";
import luri from "../../../core/js/lib/luri.js";

export default function gestures(element, type) {
  let hammertime;

  if (element.gesturesx) {
    hammertime = element.gesturesx;
  } else {
    hammertime = element.gesturesx = new Hammer(element);
  }

  hammertime.on(type, function (ev) {
    let dir = "";

    switch (ev.direction) {
      case Hammer.DIRECTION_LEFT:
        dir = "Left";
        break;
      case Hammer.DIRECTION_RIGHT:
        dir = "Right";
        break;
      case Hammer.DIRECTION_UP:
        dir = "Up";
        break
      case Hammer.DIRECTION_DOWN:
        dir = "Down";
        break;
    }

    luri.emit(type, dir, ev);
  });

  return hammertime;
}