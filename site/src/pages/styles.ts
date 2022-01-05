import {css} from '@emotion/css';
import headerLogo from '../imgs/header_logo.png';
import headerLogo2x from '../imgs/header_logo_x2.png';
import {center, fullfill} from '../styles/default';

export function makeHeaderStyles() {
    return css`
        &.k-layout-header {
            background: rgba(255, 255, 255, 0.6);
            box-shadow: 0px 1px 1px rgba(176, 176, 176, 0.63);
            color: #000;
            backdrop-filter: blur(20px);
            justify-content: space-between; 
            .logo {
                background-image: url(${headerLogo});
                width: 174px;
                height: 37px;
                background-size: cover;
                margin-left: 22px;
            }
            @media screen and (-webkit-min-device-pixel-ratio: 2) {
                .logo {
                    background-image: url(${headerLogo2x});
                }
            }
            .k-tabs {
                border: none;
                display: flex;
                align-items: center;
            }
            .k-tab {
                color: #000;
            }
            .lang-wrapper {
                height: 100%;
                display: flex;
                align-items: center;
            }
            .lang-box {
                display: flex;
                background: #DFEAF2;
                border-radius: 2px;
                padding: 4px;
                & > div {
                    color: #090909;
                    width: 66px;
                    height: 24px;
                    border-radius: 2px;
                    line-height: 24px;
                    text-align: center;
                }
                & > div.active {
                    background: #FFFFFF;
                    color: #0191EA;
                }
            }
            .main {
                height: 100%;
                display: flex;
                .theme-color-box {
                    position: relative;
                    width: 100px;
                    height: 100%;
                    background: #ffffff;
                    .cur-color {
                        ${fullfill()};
                        ${center()};
                    }
                    .theme-color-option {
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top: 65px;
                        background: #ffffff;
                        & > div {
                            height: 62px;
                            ${center()};
                        }
                    }
                    .color-item {
                        ${center()};
                        cursor: pointer;
                        width: 34px;
                        height: 34px;
                        border-radius: 50%;
                        color: #ffffff;
                        border: 4px solid #FFFFFF;
                        box-shadow: 0px 4px 20px rgba(108, 103, 103, 0.25);
                        box-sizing: border-box;
                    }
                }
            }
        }
    `
}
