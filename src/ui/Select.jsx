import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, ...props }) {
  const [searchParam, setSearchPrams] = useSearchParams();

  const sortBy = searchParam.get("sortBy") || "";

  function handleChange(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchPrams(searchParam);
  }

  return (
    <StyledSelect value={sortBy} onChange={handleChange} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
