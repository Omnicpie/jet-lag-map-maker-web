import { useEffect, useRef, type RefObject } from "react";
import "./OptionList.css";

const OptionsList = ({
  inputId,
  options,
  isDropdownOpen,
  toggleDropdown,
  onChange,
  dropdownTabIndex,
  rightAligned,
  dropdownSave,
  additionalCssClass,
  leftAlignedDropdownLabels,
  dropUpwards,
  ref,
}: {
  inputId: string;
  options: { value: string; label: string; disabled?: boolean }[];
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  onChange?: (v: { value: string; label: string; disabled?: boolean }) => void;
  dropdownTabIndex?: number;
  rightAligned: boolean;
  dropdownSave?: boolean;
  additionalCssClass?: string;
  filteredDropdown?: boolean;
  leftAlignedDropdownLabels?: boolean;
  dropUpwards?: boolean;
  ref: RefObject<null>;
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isDropdownOpen && inputRef.current) {
      setTimeout(() => {
        // @ts-expect-error refs
        inputRef.current.focus();
      }, 100);
    }
  }, [isDropdownOpen]);

  return (
    <ul
      className={`select-dropdown${isDropdownOpen ? " active" : ""}${rightAligned ? " right-aligned" : ""}${dropdownSave ? " dropdown-save" : ""}${dropUpwards ? " upwards" : ""} ${additionalCssClass}`}
      role="listbox"
      id={`${inputId}-select-dropdown`}
      tabIndex={dropdownTabIndex}
      ref={ref}
    >
      <>
        {options?.map((option, i) => {
          return (
            <li
              className={`list-option${option?.disabled ? " disabled" : ""}`}
              data-testid={`${inputId}-option-${option.label}`}
              role="option"
              key={i}
              onClick={() => {
                if (option?.disabled) return;
                if (onChange) onChange(option);
                toggleDropdown();
              }}
            >
              <input type="radio" id={option.value} name={option.value} />
              <label
                className={`${leftAlignedDropdownLabels && "left-aligned"} body`}
              >
                <p>{option.label}</p>
              </label>
            </li>
          );
        })}
      </>
    </ul>
  );
};

export default OptionsList;
