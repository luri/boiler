/**
 * Loaders from https://github.com/SamHerbert/SVG-Loaders
 */

/**
 * Returns a loader definition.
 * 
 * @param {16|32|64|96} size 
 * @param {string} classes
 * @param {string} type
 */
// add size classes for tailwind to pick up
// w-16 w-32 w-64 w-96
export default function loader(size = 32, classes = "", type = "puff") {
  return {
    class: classes || "text-prim-500",
    html: [
      {
        class: `w-${size} h-${size} mx-auto`,
        html: loaders[type]
      }
    ]
  }
}

let loaders = {
  puff: {
    "node": "svg",
    class: "w-full h-full stroke-current",
    "stroke": "#fff",
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 44 44",
    "height": "44",
    "width": "44",
    "html": [
      {
        "node": "g",
        "stroke-width": "6",
        "fill-rule": "evenodd",
        "fill": "none",
        "html": [
          {
            "node": "circle",
            "r": "1",
            "cy": "22",
            "cx": "22",
            "html": [
              {
                "node": "animate",
                "repeatCount": "indefinite",
                "keySplines": "0.165, 0.84, 0.44, 1",
                "keyTimes": "0; 1",
                "calcMode": "spline",
                "values": "1; 20",
                "dur": "1.8s",
                "begin": "0s",
                "attributeName": "r"
              },
              {
                "node": "animate",
                "repeatCount": "indefinite",
                "keySplines": "0.3, 0.61, 0.355, 1",
                "keyTimes": "0; 1",
                "calcMode": "spline",
                "values": "1; 0",
                "dur": "1.8s",
                "begin": "0s",
                "attributeName": "stroke-opacity"
              }
            ]
          },
          {
            "node": "circle",
            "r": "1",
            "cy": "22",
            "cx": "22",
            "html": [
              {
                "node": "animate",
                "repeatCount": "indefinite",
                "keySplines": "0.165, 0.84, 0.44, 1",
                "keyTimes": "0; 1",
                "calcMode": "spline",
                "values": "1; 20",
                "dur": "1.8s",
                "begin": "-0.9s",
                "attributeName": "r"
              },
              {
                "node": "animate",
                "repeatCount": "indefinite",
                "keySplines": "0.3, 0.61, 0.355, 1",
                "keyTimes": "0; 1",
                "calcMode": "spline",
                "values": "1; 0",
                "dur": "1.8s",
                "begin": "-0.9s",
                "attributeName": "stroke-opacity"
              }
            ]
          }
        ]
      }
    ]
  },

  oval: {
    "node": "svg",
    class: "w-full h-full stroke-current",
    "stroke": "#fff",
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "-2 -2 42 42",
    "height": "44",
    "width": "44",
    "html": [
      {
        "node": "g",
        "fill-rule": "evenodd",
        "fill": "none",
        "html": [
          {
            "node": "g",
            "stroke-width": "6",
            "transform": "translate(1 1)",
            "html": [
              {
                "node": "circle",
                "r": "18",
                "cy": "18",
                "cx": "18",
                "stroke-opacity": ".5"
              },
              {
                "node": "path",
                "d": "M36 18c0-9.94-8.06-18-18-18",
                "html": [
                  {
                    "node": "animateTransform",
                    "repeatCount": "indefinite",
                    "dur": "2s",
                    "to": "360 18 18",
                    "from": "0 18 18",
                    "type": "rotate",
                    "attributeName": "transform"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};