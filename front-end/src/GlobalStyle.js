import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyle = createGlobalStyle`
*{
    font-family: 'Source Sans Pro', sans-serif;
    margin: 0;
}

.navBar {
    z-index: 999px;
    width: 100%;
    height: 50px;
    background-color: #29bfa0;
    position: fixed;
}

.navBarWrapper {
    height: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo{
    font-size: 30px;
    font-weight: bold;
    color: white;
}

.navRight{
    display: flex;
    align-itmes: center;
    vertical-align
}

.iconContainer{
    position: relative;
    margin: 5px 10px 0 0;
    cursor: pointer;
    color: white; 
}

.notiCount{
    position: absolute;
    background-color: red;
    border-radius: 50%;
    height: 13px;
    width: 13px;
    font-size: 13px;
    justify-content: center;
    display: flex;
    align-items:center;
    top: -4px;
    right: -2px;
}

.avatar{
    border-radius: 50%;
    height: 40px;
    width: 40px;
}
`