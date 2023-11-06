import colors from "./colors.js";

export default {
  content: {
    relative: true,
    files: [
      "../../**/*.(js|html)"
    ]
  },
  theme: {
    colors: {
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      current: colors.current,
      prim: colors.purple,
      sec: colors.slate,
      win: colors.green,
      fail: colors.red,
      warn: colors.orange
    },
  },
  plugins: [

  ],
  safelist: [
    process.env.DEV ? { pattern: /./ } : null,
  ]
}