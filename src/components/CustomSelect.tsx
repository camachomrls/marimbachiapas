import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

export type CustomSelectProps = {
  id: string;
  labelId?: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

/**
 * Accessible custom dropdown control replacing native <select> elements.
 */
export function CustomSelect({
  id,
  labelId,
  options,
  value,
  onChange,
  placeholder = "Selecciona...",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(() =>
    Math.max(0, options.indexOf(value)),
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const idx = options.indexOf(value);
    if (idx >= 0) {
      setHighlightedIndex(idx);
    }
  }, [options, value]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      setHighlightedIndex((prev) =>
        prev < options.length - 1 ? prev + 1 : 0,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : options.length - 1,
      );
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const option = options[highlightedIndex];
        if (option) {
          handleSelect(option);
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`custom-select ${isOpen ? "is-open" : ""}`}
    >
      <button
        type="button"
        id={id}
        className={`custom-select-trigger ${isOpen ? "is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={labelId ? `${labelId} ${id}` : id}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <span className="custom-select-value">{value || placeholder}</span>
        <svg
          aria-hidden="true"
          className={`custom-select-chevron ${isOpen ? "is-open" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="custom-select-menu"
          role="listbox"
          aria-labelledby={labelId}
        >
          {options.map((option, idx) => {
            const isSelected = option === value;
            const isHighlighted = idx === highlightedIndex;
            return (
              <li
                key={option}
                role="option"
                aria-selected={isSelected}
                className={`custom-select-option ${
                  isSelected ? "is-selected" : ""
                } ${isHighlighted ? "is-highlighted" : ""}`}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onClick={() => handleSelect(option)}
              >
                <span>{option}</span>
                {isSelected && (
                  <svg
                    aria-hidden="true"
                    className="custom-select-check"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
