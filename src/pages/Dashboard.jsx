import Heading from "../ui/Heading";
import Row from "../ui/Row";
import StyledDashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <Row>
        <StyledDashboardLayout />
      </Row>
    </>
  );
}

export default Dashboard;
