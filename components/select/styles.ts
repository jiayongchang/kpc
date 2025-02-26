import {css} from '@emotion/css';
import {theme, setDefault} from '../../styles/theme';
import {deepDefaults, sizes, Sizes, getRight, getLeft} from '../../styles/utils';
import '../../styles/global';

type SizeStyles = {
    padding?: string,
    height: string,
    fontSize: string,
    multipleGap: string,
    multipleMargin: string,
}

const defaults = deepDefaults(
    {
        get transition() { return theme.transition.middle },
        width: `300px`,
        get height() { return theme.default.height },
        bgColor: '#fff',
        get fontSize() { return theme.default.fontSize },
        get border() { return `1px solid ${theme.color.border}` },
        get focusBorder() { return `1px solid ${theme.color.primary}` },
        // get hoverBorder() { return `1px solid ${theme.color.darkBorder}` },
        get hoverBorder() { return `1px solid ${theme.color.primary}` },
        get activeColor() { return theme.color.primary },
        get borderRadius() { return theme.borderRadius },
        suffixGap: '10px',

        clearGap: `8px`,
        get placeholderColor() { return theme.color.placeholder },

        // disabled
        disabled: {
            get color() { return theme.color.disabled },
            get bgColor() { return theme.color.disabledBg },
            get borderColor() { return theme.color.disabledBorder },
        },

        // group
        group: {
            get labelColor() { return theme.color.disabled },
            labelPadding: `8px`,
        },
        // card
        card: {
            height: `160px`,
            get itemHoverColor() { return theme.color.primary },
            itemHoverBgColor: `transparent`,
        },

        // multiple
        multiple: {
            checkmark: {
                fontSize: '32px',
            },
        },
        tag: {
            margin: `3px 8px 3px 0`,
            padding: `1px 8px`,
            get borderRadius() { return theme.borderRadius },
            get bgColor() { return theme.color.bg },
            disabledBgColor: '#f8f9fa',

            delete: {
                gap: `8px`,
                fontSize: '14px',
                get color() { return theme.color.lightBlack },
            }
        },

        menuMaxHeight: `200px`,

        // empty
        empty: {
            padding: `16px`,
            get color() { return theme.color.placeholder },
        },

        // searchable
        searchable: {
            padding: `16px 16px 8px 16px`,
            headerGap: `8px`,
            get border() { return `1px solid ${theme.color.border}` },
            header: {
                padding: `0 0 16px 0`,
                gap: `8px`,
                btnPadding: `0`,
                btnGap: `16px`,
            },
            optionPadding: `0 8px`,
            footer: {
                padding: `8px 0 0`,
                gap: `8px`,
                btnGap: `8px`,
            },
        },
    },
    sizes.reduce((memo, size) => {
        memo[size] = {
            get padding() { return `0 ${theme[size].padding}` },
            get height() { return theme[size].height },
            get fontSize() { return theme[size].fontSize },
            multipleGap: `1px`,
            multipleMargin: `0 2px 1px 0`,
        }

        return memo;
    }, {} as Record<Sizes, SizeStyles>)
);

let select: typeof defaults;
setDefault(() => {
    select = deepDefaults(theme, {select: defaults}).select;
});

export default function makeStyles() {
    return css`
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        position: relative;
        width: ${select.width};
        cursor: pointer;
        outline: none;
        border: ${select.border};
        background: ${select.bgColor};
        transition: border ${select.transition}, background ${select.transition}, box-shadow ${select.transition};
        border-radius: ${select.borderRadius};
        .k-select-main {
            flex: 1;
            min-width: 0;
        }
        .k-select-prefix,
        .k-select-suffix {
            position: relative;
        }
        .k-select-suffix {
            margin-left: ${select.suffixGap};
            margin-top: 2px;
        }

        .k-select-placeholder {
            color: ${select.placeholderColor};
            user-select: none;
        }

        &.k-fluid {
            width: 100%;
        }

        // clearable
        .k-select-clear {
            opacity: 0;
            transition: opacity ${select.transition}, color ${select.transition} !important;
            pointer-events: none;
            position: absolute;
            z-index: 1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        &:hover {
            border: ${select.hoverBorder};
            .k-select-clear.k-show {
                opacity: 1;
                pointer-events: all;
                + .k-select-suffix-icon {
                    opacity: 0;
                }
            }
        }
        .k-select-suffix-icon {
            display: inline-block;
            transition: opacity ${select.transition};
        }

        .k-select-arrow {
            display: inline-block;
            transition: transform ${select.transition};
        }

        // show
        &.k-dropdown-open {
            border: ${select.focusBorder};
            .k-select-arrow {
                transform: rotateX(180deg);
            }
        }
        &:focus {
            outline: none;
            border: ${select.focusBorder};
        }

        // disabled
        &.k-disabled {
            color: ${select.disabled.color};
            cursor: not-allowed;
            background: ${select.disabled.bgColor};
            border-color: ${select.disabled.borderColor};
            .k-select-tag {
                background: ${select.tag.disabledBgColor};
            }
        }

        // multiple
        .k-select-values {
            display: inline-block;
            margin-right: -${getRight(select.tag.margin)};
            width: 100%;
            &.k-with-values {
                margin: 0;
            }
        }
        .k-select-tag {
            display: inline-flex;
            align-items: center;
            padding: ${select.tag.padding};
            background: ${select.tag.bgColor};
            border-radius: ${select.tag.borderRadius};
            margin: ${select.tag.margin};
            max-width: calc(100% - ${getRight(select.tag.margin)} - 1px);
        }
        .k-select-text {
            max-width: calc(100% - 18px);
            word-break: break-word;
        }
        .k-select-close {
            margin-left: ${select.tag.delete.gap};
            font-size: ${select.tag.delete.fontSize};
        }

        // size
        ${sizes.map(size => {
            const styles = select[size];
            const className = css`
                font-size: ${styles.fontSize};
                min-height: ${styles.height};
                padding: ${styles.padding};
            `;
            if (size === 'default') return className;
            return css`
                &.k-${size}  {
                    ${className}
                }
            `
        })}

        // inline
        &.k-inline {
            width: auto;
            border: none;
            min-height: 0;
            background: transparent;
            .k-select-placeholder,
            .k-select-value {
                line-height: inherit;
            }
        }
    `;
}

export function makeMenuStyles() {
    const searchable = select.searchable;
    
    return css`
        min-width: auto;
        max-height: ${select.menuMaxHeight};
        overflow: auto;
        &:not([class*="-active"]) {
            transition: left ${select.transition}, top ${select.transition};
        }
        .k-select-empty {
            padding: ${select.empty.padding};
            color: ${select.empty.color};
            text-align: center;
        }
        .k-select-option {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &.k-active {
                color: ${select.activeColor};
            }
        }

        // card
        &.k-card {
            display: flex;
            height: ${select.card.height};
            .k-tabs {
                border: none;
                overflow: auto;
            }
            .k-select-group {
                flex: 1;
                overflow: auto;
            }
            .k-select-option.k-hover {
                background: ${select.card.itemHoverBgColor};
                color: ${select.card.itemHoverColor};
            }
        }

        // searchable
        &.k-searchable {
            max-height: none;
            padding: ${searchable.padding};
            .k-select-option {
                padding: ${searchable.optionPadding};
            }
        }
        .k-select-header {
            display: flex;
            padding: ${searchable.header.padding};
            border-bottom: ${searchable.border};
            margin-bottom: ${searchable.header.gap};
        }
        .k-select-op {
            white-space: nowrap;
            .k-btn {
                padding: ${searchable.header.btnPadding};
                margin-left: ${searchable.header.btnGap};
            }
        }
        .k-select-body {
            max-height: ${select.menuMaxHeight};
            overflow: auto;
        }
        .k-select-footer {
            border-top: ${searchable.border};
            padding: ${searchable.footer.padding};
            text-align: right;
            margin-top: ${searchable.footer.gap};
            .k-btn {
                margin-left: ${searchable.footer.btnGap};
            }
        }
        .k-select-option {
            .k-checkbox {
                margin: 0 -${getRight(searchable.optionPadding)} 0 -${getLeft(searchable.optionPadding)};
                padding: ${searchable.optionPadding};
            }
        }

        // multiple checkmark
        .k-select-checkmark {
            float: right;
            height: 100%;
            font-size: ${select.multiple.checkmark.fontSize};
        }
    `;
}

export function makeGroupStyles() {
    return css`
        .k-select-group-label {
            color: ${select.group.labelColor};
            padding: ${select.group.labelPadding};
        }
    `
}
