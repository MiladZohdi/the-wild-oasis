import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonGroup from "../../ui/ButtonGroup";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import Tag from "../../ui/Tag";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Button from "../../ui/Button";
import { HiArchiveBox, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useRemoveBooking } from "./useRemoveBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckout();
  const { removeBooking, isDeleting } = useRemoveBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { status, id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}

          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkOut({ bookingId })}
              ddisanbled={isCheckingOut}
            >
              Check out
            </Button>
          )}

          {status === "checked-out" && (
            <Modal.Open opens="delete">
              <Button
                variation="danger"
                icon={<HiArchiveBox />}
                onClick={() => {}}
                ddisanbled={isDeleting}
              >
                Delete
              </Button>
            </Modal.Open>
          )}

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              onConfirm={() =>
                removeBooking({ bookingId }, { onSettled: () => navigate(-1) })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
