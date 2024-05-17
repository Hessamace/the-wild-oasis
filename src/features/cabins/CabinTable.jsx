import styled from "styled-components";

import Spinner from "./../../ui/Spinner";

import CabinRow from "./CabinRow";
import {useCabins} from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menu from "../../ui/Menus";
import {useSearchParams} from "react-router-dom";
import Empty from "../../ui/Empty.jsx";

function CabinTable() {
  const {isLoading, cabins} = useCabins();
  const [searchParams] = useSearchParams();


  //FILTER
  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins =
    filterValue === "all"
      ? cabins
      : (cabins?.filter(item => {
        if (filterValue === "with-discount") {
          return item.discount > 0;
        } else if (filterValue === "no-discount") {
          return item.discount === 0;
        }
      }));

  //SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier);

  if (isLoading) return <Spinner/>;
  if (!cabins.length) return <Empty resourceName="cabins"/>;
  return (
    <Menu>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins}
                    render={(cabin) => (
                      <CabinRow key={cabin.id} cabin={cabin}/>
                    )}/>
      </Table>
    </Menu>
  );
}

export default CabinTable;
