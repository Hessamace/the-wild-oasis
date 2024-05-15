import styled from "styled-components";

import Spinner from "./../../ui/Spinner";

import CabinRow from "./CabinRow";
import {useCabins} from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menu from "../../ui/Menus";
import {useSearchParams} from "react-router-dom";

function CabinTable() {
  const {isLoading, cabins} = useCabins();
  const [searchParams] = useSearchParams();

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

  if (isLoading) return <Spinner/>;
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
        <Table.Body data={filteredCabins}
                    render={(cabin) => (
                      <CabinRow key={cabin.id} cabin={cabin}/>
                    )}/>
      </Table>
    </Menu>
  );
}

export default CabinTable;
