/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/interactive-supports-focus */

/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable react/prop-types */
const {
  Component,
  createRef
} = React;

const classNames = obj => // eslint-disable-next-line no-return-assign
Object.entries(obj).reduce((acc, [k, v]) => acc += v ? ` ${k}` : '', '');

const DEFAULT_PLACEHOLDER_STRING = 'Select...';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
        value: ''
      },
      isOpen: false
    };
    this.dropdownRef = createRef();
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.fireChangeEvent = this.fireChangeEvent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      if (this.props.value) {
        const selected = this.parseValue(this.props.value, this.props.options);

        if (selected !== this.state.selected) {
          this.setState({
            selected
          });
        }
      } else {
        this.setState({
          selected: {
            label: typeof this.props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : this.props.placeholder,
            value: ''
          }
        });
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleMouseDown(event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen);
    }

    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  parseValue(value, options) {
    let option;

    if (typeof value === 'string') {
      for (let i = 0, num = options.length; i < num; i++) {
        if (options[i].type === 'group') {
          const match = options[i].items.filter(item => item.value === value);

          if (match.length) {
            option = match[0];
          }
        } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
          option = options[i];
        }
      }
    }

    return option || value;
  }

  setValue(value, label) {
    const newState = {
      selected: {
        value,
        label
      },
      isOpen: false
    };
    this.fireChangeEvent(newState);
    this.setState(newState);
  }

  fireChangeEvent(newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  }

  renderOption(option) {
    let value = option.value;

    if (typeof value === 'undefined') {
      value = option.label || option;
    }

    const label = option.label || option.value || option;
    const isSelected = value === this.state.selected.value || value === this.state.selected;
    const classes = {
      [`${this.props.baseClassName}-option`]: true,
      [option.className]: !!option.className,
      'is-selected': isSelected
    };
    const optionClass = classNames(classes);
    return /*#__PURE__*/React.createElement("div", {
      key: value,
      className: optionClass,
      onMouseDown: this.setValue.bind(this, value, label),
      onClick: this.setValue.bind(this, value, label),
      role: "option",
      "aria-selected": isSelected ? 'true' : 'false'
    }, label);
  }

  buildMenu() {
    const {
      options,
      baseClassName
    } = this.props;
    const ops = options.map(option => {
      if (option.type === 'group') {
        const groupTitle = /*#__PURE__*/React.createElement("div", {
          className: `${baseClassName}-title`
        }, option.name);

        const _options = option.items.map(item => this.renderOption(item));

        return /*#__PURE__*/React.createElement("div", {
          className: `${baseClassName}-group`,
          key: option.name,
          role: "listbox",
          tabIndex: "-1"
        }, groupTitle, _options);
      } else {
        return this.renderOption(option);
      }
    });
    return ops.length ? ops : /*#__PURE__*/React.createElement("div", {
      className: `${baseClassName}-noresults`
    }, "No options found");
  }

  handleDocumentClick(event) {
    if (this.mounted) {
      if (!this.dropdownRef.current.contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false
          });
        }
      }
    }
  }

  isValueSelected() {
    return typeof this.state.selected === 'string' || this.state.selected.value !== '';
  }

  render() {
    const {
      baseClassName,
      controlClassName,
      placeholderClassName,
      menuClassName,
      arrowClassName,
      arrowClosed,
      arrowOpen,
      className
    } = this.props;
    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
    const dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      [className]: !!className,
      'is-open': this.state.isOpen
    });
    const controlClass = classNames({
      [`${baseClassName}-control`]: true,
      [controlClassName]: !!controlClassName,
      [disabledClass]: !!disabledClass
    });
    const placeholderClass = classNames({
      [`${baseClassName}-placeholder`]: true,
      [placeholderClassName]: !!placeholderClassName,
      'is-selected': this.isValueSelected()
    });
    const menuClass = classNames({
      [`${baseClassName}-menu`]: true,
      [menuClassName]: !!menuClassName
    });
    const arrowClass = classNames({
      [`${baseClassName}-arrow`]: true,
      [arrowClassName]: !!arrowClassName
    });
    const value = /*#__PURE__*/React.createElement("div", {
      className: placeholderClass
    }, placeHolderValue);
    const menu = this.state.isOpen ? /*#__PURE__*/React.createElement("div", {
      className: menuClass,
      "aria-expanded": "true"
    }, this.buildMenu()) : null;
    return /*#__PURE__*/React.createElement("div", {
      ref: this.dropdownRef,
      className: dropdownClass
    }, /*#__PURE__*/React.createElement("div", {
      className: controlClass,
      onMouseDown: this.handleMouseDown.bind(this),
      onTouchEnd: this.handleMouseDown.bind(this),
      "aria-haspopup": "listbox"
    }, value, /*#__PURE__*/React.createElement("div", {
      className: `${baseClassName}-arrow-wrapper`
    }, arrowOpen && arrowClosed ? this.state.isOpen ? arrowOpen : arrowClosed : /*#__PURE__*/React.createElement("span", {
      className: arrowClass
    }))), menu);
  }

}

Dropdown.defaultProps = {
  baseClassName: 'Dropdown'
};
export default Dropdown;
//# sourceMappingURL=Dropdown.js.map