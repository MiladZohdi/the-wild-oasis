import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "../dashboard/TodayItem";
import { useTodayActivity } from "../dashboard/useTodayActivity";
const StyledToday = styled.div`
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isLoading, stays } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading type="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        stays?.length > 0 ? (
          <TodayList>
            {stays.map((stay) => (
              <TodayItem key={stay.id} stay={stay} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
