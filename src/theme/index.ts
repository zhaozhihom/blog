import { createMuiTheme } from "@material-ui/core/styles";
let palette1 = {
  type: "light"
};

const typography = {
  fontFamily: ["Cambria", "Roboto", "Microsoft JhengHei", "Microsoft YaHei", "微软雅黑", "STXihei", "华文细黑"].join(","),
};

let theme1 = createMuiTheme({ palette: palette1, typography });

export { theme1 };