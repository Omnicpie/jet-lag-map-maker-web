import "./Dropdown.css";
import useDropdown from "../../hooks/useDropdown/useDropdown";
import OptionsList from "./OptionList/OptionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  getInputClassList,
  getInputWrapperClassList,
} from "../../utils/dropdown/dropdown.utils";

const Dropdown = ({
  inputId,
  label,
  value,
  onChange,
  handleClick = () => {},
  rightAligned = true,
  options,
  placeholder = "",
  disabled = false,
  readOnly = false,
  error = "",
  tabIndex = 0,
  dropdownTabIndex = 0,
  small = false,
  additionalCssClass,
  defaultOption = false,
  leftAlignedDropdownLabels = false,
  dropUpwards = false,
  filteredDropdown = false,
  initiallyOpen = false,
  getDispayValue,
}: {
  inputId: string;
  label?: string;
  value?: string;
  onChange: (e: { value: string; label: string; disabled?: boolean }) => void;
  handleClick?: () => void;
  options: { label: string; value: string; disabled?: boolean }[];
  rightAligned?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  tabIndex?: number;
  dropdownTabIndex?: number;
  small?: boolean;
  additionalCssClass?: string;
  defaultOption?: boolean;
  leftAlignedDropdownLabels?: boolean;
  dropUpwards?: boolean;
  filteredDropdown?: boolean;
  initiallyOpen?: boolean;
  required?: boolean;
  getDispayValue?: (v: string) => string;
}) => {
  const {
    dropdownRef,
    isDropdownOpen,
    toggleDropdown,
    dropdownOptionsListRef,
  } = useDropdown(initiallyOpen);

  return (
    <div
      className={`dropdown-container ${additionalCssClass}`}
      ref={dropdownRef}
    >
      {!!label && <label htmlFor={inputId}>{label}</label>}

      <div
        className={getInputWrapperClassList(
          "custom-select body",
          readOnly,
          disabled,
          error,
        )}
        id={`${inputId}-custom-select`}
      >
        <button
          id={`${inputId}-select-button`}
          data-testid={`${inputId}-select-button`}
          className={`${getInputClassList(
            placeholder,
            error,
            isDropdownOpen,
            additionalCssClass,
          )} ${small && "smaller-height"}`}
          type="button"
          role="combobox"
          aria-labelledby={inputId}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-controls="select-dropdown"
          onClick={() => {
            toggleDropdown();
            handleClick();
          }}
          disabled={disabled}
          tabIndex={tabIndex}
        >
          <span
            data-testid="selected-dropdown-value"
            className={`selected-value body ${defaultOption && "default-option-text"}`}
          >
            {getDispayValue ? getDispayValue(value || "") : value}
          </span>

          <span className="arrow">
            <FontAwesomeIcon
              icon={faChevronDown}
              width={12}
              height={12}
              className=""
            />
          </span>
        </button>
        {!disabled && !readOnly ? (
          <OptionsList
            inputId={inputId}
            options={options}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            rightAligned={rightAligned}
            onChange={onChange}
            dropdownTabIndex={dropdownTabIndex}
            additionalCssClass={additionalCssClass}
            leftAlignedDropdownLabels={leftAlignedDropdownLabels}
            dropUpwards={dropUpwards}
            filteredDropdown={filteredDropdown}
            ref={dropdownOptionsListRef}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Dropdown;
