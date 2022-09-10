import "styled-components";
import breakpoints from "../../../Utils/Breakpoints";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface DefaultTheme {
    id: string;
    title: string;
    colors: {
      primary: string;
      secundary: string;
      background: string;
      splashBackground: string;
      surface: string;
      text_on_surface: string;
      text_descriptions: string;
      light_text: string;
      danger: string;
      transparent: string;
      input_background: string;
    };
    font_family: string;
    border_radius: number;
    input_border: string;
    box_shadows: {
      card: string;
      cardx: string;
      header: string;
    };
    breakpoints: typeof breakpoints;
  }
}
