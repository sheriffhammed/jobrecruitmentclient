import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "../homepage.css";
import HomePageNavBar from "./HomePageNavBar";
const HomePageBanner = ({query, handleInputChange}) => {
  return (
    <div className="container-fluid banner-backgroud">
      <Container fluid>
        <HomePageNavBar />

        <h1 className="mt-3 text-center">
          Ready for another job? Search job below, top job picks for you
        </h1>
        <div className="container-fluid text-light text-left" >
          <Stack direction="horizontal" className="row justify-content-center">
            <Form.Control
              className="me-auto"
              placeholder="Search job by title here..."
              id="search"
              onChange={handleInputChange}
              value={query}
            />
         
            <div className="vr" />
          </Stack>
        </div>
      </Container>
    </div>
  );
};

export default HomePageBanner;
