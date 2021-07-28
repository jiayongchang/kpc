import {css} from '@emotion/css';
import {theme, ThemeValue} from '../../styles/theme';
import {deepDefaults, palette}  from '../../styles/utils';
import '../../styles/global';

type ValueOf<T extends readonly any[]> = T[number]

type Types = ValueOf<typeof types>

type Sizes = ValueOf<typeof sizes>

type TypeStyles = {
    color: ThemeValue<string>
}

type SizeStyles = {
    width: ThemeValue<string>
    height: ThemeValue<string>
    marginLeft: ThemeValue<string>
}

export const types = ['primary', 'warning', 'danger', 'success'] as const;

const sizes = ['large', 'default', 'small', 'mini'] as const;

const typeStyles = types.reduce((memo, type) => {
    const color = theme.color;
    memo[type] = {
        get color() { return color[type as Types] },
    };
    return memo;
}, {} as {[key in Types]: TypeStyles});


const {timelineItem} = deepDefaults(theme, {
    timelineItem: deepDefaults(
        {
            padding: '0 0 16px 24px',
            get lineBorder() { return `1px solid ${theme.color.border}` },

            indicator: {
                width: '16px',
            }
        },
        typeStyles,

        // sizeStyles
        {
            large:{
                width: '13px'
            },
            default:{
                width: '9px'
            },
            small:{
                width: '7px'
            },
            mini:{
                width: '5px'
            }
        }
    )
});

export {timelineItem};

export default function makeStyles() {
    return css`
        position: relative;
        padding: ${timelineItem.padding};
       
        >.k-timeline-indicator {
            width: ${timelineItem.indicator.width};
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            text-align: center;
            .k-timeline-dot {
                position: relative;
                z-index: 1;
                transform: translateY(-50%);
            }
               
            .k-timeline-circle {
                position: relative;
                background: ${theme.color.primary};
                border-radius: 50%;
                left: 50%;
            }
               
            .k-timeline-line {
                position: absolute;
                height: 100%;
                border-left: ${timelineItem.lineBorder};
                top: 0;
                left: 50%;
            }
                
        }
        > .k-timeline-content {
            position: relative;
            top: calc(-0.5 * ${theme.lineHeight}em);
        }
     
        &:last-of-type {
            > .k-timeline-indicator {
                .k-timeline-line {
                    display: none;
                }
            }
        }

        // types
        ${types.map(type => {
            const typeStyles = timelineItem[type];

            return css`
                &.k-${type} {
                    > .k-timeline-indicator {
                        color: ${typeStyles.color};
                        .k-timeline-circle {
                            background: ${typeStyles.color};
                        }
                    }
                }
            `;
        })}

        // sizes
        ${sizes.map(size => {
            const styles = timelineItem[size];
            const sizeClassName = css`
                > .k-timeline-indicator {
                    .k-timeline-circle {
                        width: ${styles.width};
                        height: ${styles.width};
                        // when we use translateX(-50%) the line can not position at center of dot
                        margin-left: calc(-0.5 * ${styles.width});
                    }
                }     
            `;
            if (size === 'default') return sizeClassName;

            return css`
                &.k-${size} {
                    ${sizeClassName};
                }
            `
        })}
    `;
};