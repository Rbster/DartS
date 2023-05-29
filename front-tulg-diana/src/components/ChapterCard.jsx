import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Card from "react-bootstrap/esm/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

export default function ChapterCard(props) {
    const navigate = useNavigate();
    console.log(props.longreadData.longreadId)
    const longreadData = props.longreadData
    const chapterData = props.chapterData


    const handleClick = () => {
        navigate(`/longreads/${longreadData.longreadId}/${chapterData.id}`, {
          state: {
            longreadData: longreadData,
            chapterData: chapterData
          }
        });
    };

    return (
    <Card
      style={{
        border: "none",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutters={0}>
        <Col
          md={5}
          style={{
            marginRight: "-15px",
          }}
        >
          <p>Chapter #{props.chapterIdx + 1}</p>
          {/* <StyledImage src={props.longreadData.img} alt={props.longreadData.title} /> */}
        </Col>
        <Col md={7} className="d-flex flex-column">
          <Card.Body>
            <Card.Title>{chapterData.name}</Card.Title>
            <Card.Text
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                lineClamp: "3",
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}
            >
              {props.desc}
            </Card.Text>
          </Card.Body>
          <div
            className="mt-auto"
            style={{
              marginLeft: "15px",
              marginBottom: "15px",
            }}
          >
            <StyledButtonActive onClick={handleClick}>Read</StyledButtonActive>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

const StyledButtonActive = styled(Button)`
  background-color: rgba(0, 81, 85, 1);
  border: none;
  border-radius: 4px;
  color: #ffffff;
  text-decoration: none;
  &:hover {
    background-color: rgba(0, 81, 85, 0.7);
    color: #ffffff;
  }
  &:active {
    background-color: rgba(0, 81, 85, 1) !important;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }
`;

const StyledImage = styled(Card.Img)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
`;
