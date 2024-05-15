import TableOperations from "/src/ui/TableOperations.jsx";
import Filter from "/src/ui/Filter.jsx";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={[
        {value: "all", label: "All"},
        {value: "with-discount", label: "With Discount"},
        {value: "no-discount", label: "No Discount"},
      ]}/>
    </TableOperations>
  );
}

export default CabinTableOperations;
