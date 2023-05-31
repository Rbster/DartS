import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Card from "react-bootstrap/esm/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useEffect, useState }  from "react";
import { useForm, Controller } from "react-hook-form";

export default function BlockContentCard(props) {
    const navigate = useNavigate();
    const longreadData = props.longreadData
    const chapterData = props.chapterData
    const blockData = props.blockData
    const onDeleteClicked = () => props.onDeleteClicked(blockData.id)

    const [eventData, setEventData] = useState({})
  
    const isNotNull = (obj) => obj !== undefined && obj !== null
    
    const [deleteVisible, setDeleteVisible] = useState( blockData.floating_text !== undefined && blockData.floating_text  !== null)
    useEffect(() => {
        setDeleteVisible(isNotNull(blockData.floating_text))
        console.log(`visability of button ${blockData.id} delete = ${deleteVisible}`)
        console.log(`visability of button ${blockData.id} delete = ${isNotNull(blockData.floating_text)}`)
    }, [props.blockData.floating_text]);



  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    props.onEditClicked(blockData.id, {
      "coordx": parseInt(data.coordx, 10),
      "coordy": parseInt(data.coordy, 10),
      "time": parseInt(data.time, 10),
      "floating_text": `${data.floating_text}`
    })
    console.log(data)
  }

    // const handleClick = () => {
    //     console.log("clicked !")
    //     navigate(`/longreads/${longreadData.longreadId}/${chapterData.id}`, {
    //       state: {
    //         longreadData: longreadData,
    //         chapterData: chapterData
    //       }
    //     });
    // };

    // const navigateToLongread = () => {
    //   console.log("clicked  navigateToLongread!")
    //   navigate(`/longreads/${longreadData.longreadId}`, {
    //     state: {
    //       longreadData: longreadData,
    //       chapterData: chapterData
    //     }
    //   });
    // };

    return (
    <Card
      style={{
        border: "none",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutters={0}>
        <Col md={10} className="d-flex flex-column">
          <Card.Body>
            {/* <Card.Title>{chapterData.name}</Card.Title> */}
            <Card.Text
              // style={{
              //   overflow: "hidden",
              //   display: "-webkit-box",
              //   WebkitLineClamp: "3",
              //   lineClamp: "3",
              //   WebkitBoxOrient: "vertical",
              //   textOverflow: "ellipsis",
              // }}
            >
              {blockData.text}
            </Card.Text>
          </Card.Body>
          <div
            className="mt-auto"
            style={{
              marginLeft: "15px",
              marginBottom: "15px",
            }}
          >
            
          </div>
        </Col>
        <Col
          md={2}
          style={{
            marginRight: "-15px",
          }}
        >
          <Card style={{
            border: "none",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          }}>
            {/* <StyledButtonActive  variant="secondary"> { deleteVisible ? "Edit event" : "Add event" }</StyledButtonActive> */}

            <OverlayTrigger
              trigger="click"
              flip={false}
              overlay={<Popover>
                <Popover.Body>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                  
                    <input type="number" {...register("coordx",  { pattern: /^[0-9]+$/i })} />
                    <input type="number" {...register("coordy", { pattern: /^[0-9]+$/i })} />
                    <input type="number" {...register("time", { pattern: /^[0-9]*$/i })} />
                    <input {...register("floating_text", { pattern: /^.+$/i, min: 1})} />
                  
                    <StyledButtonActive type="submit"> { deleteVisible ? "Edit event" : "Add event" } </StyledButtonActive>
                  </form>
                </Popover.Body>
              </Popover>}   
            >
              <StyledButtonActive  variant="secondary"> { deleteVisible ? "Edit event" : "Add event" }</StyledButtonActive>
            </OverlayTrigger>

            


            {deleteVisible && <StyledButtonActive onClick={onDeleteClicked}>DeleteEvent</StyledButtonActive>}
            
            
          {/* Here will be button to add event and to show Map */}
            


            {/* <OverlayTrigger
              trigger="click"
              overlay={<Popover>
                <Popover.Body>
                  Delete Event Form
                </Popover.Body>
              </Popover>}   
            >
              <StyledButtonActive variant="secondary">Delete event</StyledButtonActive>
            </OverlayTrigger> */}

          </Card>
          
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
