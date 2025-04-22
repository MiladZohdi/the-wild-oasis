import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParam] = useSearchParams();

  if (isLoading) return <Spinner />;

  //Filter
  const filterBy = searchParam.get("filter") || "all";
  let filteredData;
  if (filterBy === "all") filteredData = cabins;
  if (filterBy === "no-discount")
    filteredData = cabins.filter((cabin) => cabin.discount === 0);
  if (filterBy === "with-discount")
    filteredData = cabins.filter((cabin) => cabin.discount > 0);

  //Sort
  const sortBy = searchParam.get("sortBy") || "";
  let sortedData;
  const [field, sort] = sortBy.split("-");
  const modifier = sort === "ASC" ? 1 : -1;
  sortedData = filteredData.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedData}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
