export const getInputIconColour = (
  inactive?: boolean,
  readOnly?: boolean,
  orangeIconColor?: boolean,
  leftIconColor?: string | null,
) => {
  if (leftIconColor) return leftIconColor;
  if (orangeIconColor) return "var(--primary)";
  if (inactive || readOnly) return "var(--grey-400)";
  return "var(--black)";
};

export const getInputWrapperClassList = (
  component?: string,
  readOnly?: boolean,
  inactive?: boolean,
  error?: object | string | boolean,
  withIconButton?: boolean,
  noInputBoxOutline?: boolean,
  disabled?: boolean,
) => {
  const inputWrapperClassList = [component];

  if (noInputBoxOutline) {
    inputWrapperClassList.push("no-input-box-outline");
  }

  if (withIconButton) {
    inputWrapperClassList.push("with-icon-button");
  }

  if (readOnly) {
    inputWrapperClassList.push("read-only");
    return inputWrapperClassList.join(" ");
  }

  if (inactive) {
    inputWrapperClassList.push("inactive");
    return inputWrapperClassList.join(" ");
  }

  if (error) {
    inputWrapperClassList.push("error");
    return inputWrapperClassList.join(" ");
  }

  if (disabled) {
    inputWrapperClassList.push("disabled");
    return inputWrapperClassList.join(" ");
  }
  return inputWrapperClassList.join(" ");
};

export const getInputButtonClassList = (
  component?: string,
  readOnly?: boolean,
  inactive?: boolean,
  error?: object | string,
) => {
  const inputButtonClassList = [component];
  if (readOnly) {
    inputButtonClassList.push("read-only");
    return inputButtonClassList.join(" ");
  }

  if (inactive) {
    inputButtonClassList.push("inactive");
    return inputButtonClassList.join(" ");
  }

  if (error) {
    inputButtonClassList.push("error");
    return inputButtonClassList.join(" ");
  }

  return inputButtonClassList.join(" ");
};

export const getInputClassList = (
  placeholder?: string,
  error?: string,
  isDropdownOpen?: boolean,
  additionalCssClass?: string,
) => {
  const inputClassList = ["select-button", additionalCssClass];

  if (placeholder === "" && error === "") inputClassList.push("active");
  if (isDropdownOpen && !inputClassList.includes("dropdown-open")) {
    inputClassList.push("dropdown-open");
  } else if (!isDropdownOpen && inputClassList.includes("dropdown-open")) {
    inputClassList.splice(inputClassList.indexOf("dropdown-open"), 1);
  }

  return inputClassList.join(" ");
};
