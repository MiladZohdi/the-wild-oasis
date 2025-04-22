import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-ASC", label: "Sort by name ('A' - 'Z')" },
          { value: "name-DESC", label: "Sort by name ('Z' - 'A')" },
          { value: "regularPrice-ASC", label: "Sort by price (Low first)" },
          { value: "regularPrice-DESC", label: "Sort by price (High first)" },
          { value: "maxCapacity-ASC", label: "Sort by capacity (Low first)" },
          { value: "maxCapacity-DESC", label: "Sort by capacity (High first)" },
        ]}
        type="white"
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
