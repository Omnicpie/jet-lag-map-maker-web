import { useEffect, useRef, useState } from "react";

const useDropdown = (initialState = false) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(initialState);
  const dropdownRef = useRef(null);
  const dropdownOptionsListRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen((s) => !s);

  const hoverDropdown = (toggleState = false) => setIsDropdownOpen(toggleState);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      // @ts-expect-error refs
      !dropdownRef?.current?.contains(event.target) &&
      // @ts-expect-error refs
      !dropdownOptionsListRef?.current?.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    dropdownRef,
    dropdownOptionsListRef,
    isDropdownOpen,
    toggleDropdown,
    hoverDropdown,
  };
};

export default useDropdown;
