import { createGlobalStyle } from "styled-components";
import "nprogress/nprogress.css";

export default createGlobalStyle`

  html{
    scroll-behavior: smooth;
  }
  
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

ul{
  list-style: none;
  display: block;
}

body{
    background: ${(props) => props.theme.colors.background};
    font-size: 15px;
    color:  ${(props) => props.theme.colors.text_on_surface};
    font-family:  ${(props) => props.theme.font_family};

}

  #nprogress .bar {
    background: ${(props) => props.theme.colors.secundary} !important;
  }

  #nprogress .peg {
    box-shadow: 0 0 10px ${(props) => props.theme.colors.secundary}, 0 0 5px ${(props) => props.theme.colors.secundary} !important;
  }
`;
