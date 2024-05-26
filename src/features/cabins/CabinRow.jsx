import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm.jsx";
import {useDeleteCabin} from "./useDeleteCabin.js";
import {formatCurrency} from "./../../utils/helpers";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import {useCreateCabin} from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({cabin}) {
  const {isDeleting, deleteCabin} = useDeleteCabin();
  const {isCreating, createCabin} = useCreateCabin();

  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }


  return (
    <Table.Row role="row">
      <Img src={image}/>
      <Cabin>{name}</Cabin>
      <div>Fits up tp {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount
        ? <Discount>{formatCurrency(discount)}</Discount>
        : <span>&mdash;</span>}
      <div>

        <Modal>

          <Menus.Menu>
            <Menus.Toggle id={cabinId}/>

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack/>}
                            onClick={handleDuplicate}
                            disabled={isCreating}>Duplicate</Menus.Button>

              <Modal.Open opens="cabin-form-edit">
                <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="cabin-confirm-delete">
                <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
              </Modal.Open>

            </Menus.List>

            <Modal.Window name="cabin-form-edit">
              <CreateCabinForm cabinToEdit={cabin}/>
            </Modal.Window>
            <Modal.Window name="cabin-confirm-delete">
              <ConfirmDelete resourceName={`cabin ${name}`}
                             onConfirm={() => deleteCabin(cabinId)}
                             disabled={isDeleting}/>
            </Modal.Window>

          </Menus.Menu>
        </Modal>


      </div>
    </Table.Row>
  );
}

export default CabinRow;
