import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import styled from "styled-components";
import { Breadcrumb } from "react-bootstrap";
import BlockContentCard from "../components/BlockContentCard";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Api from "../helper/Api"
import ApiTimeline from "../helper/ApiTimeline"

import axios from 'axios';

export default function ChapterPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [blockContentsHolder, setBlockContentsHolder] = useState([]);

    
    const navigate = useNavigate();
    const location = useLocation();
    const longreadData = location.state.longreadData
    const chapterData = location.state.chapterData
    const toLongreadPage = () => {
        navigate(`/longreads/${longreadData.longreadId}`, {
            state: {
                longreadData: longreadData,
            }
        });
    };

    const api = new Api();
    const apiTimeline = new ApiTimeline();

    const [deleteClicked, setDeleteClicked] = useState(false);
    
    useEffect(() => { 
        api.getContentBlockData(chapterData.id)
            .then(response => {
                setLoading(false);
                setBlockContentsHolder(response.data);
            })
            .catch(error => {
                setLoading(false);
                setError('Error fetching longreads' + error);
            });
        console.log('blockContents updated')
    }, [deleteClicked]);

// Use side-effect may be bad!!
    const onDeleteClicked = (blockContentId) => {
        console.log(`delete clicked with blockContentId = ${blockContentId}`)
        apiTimeline.deleteEvent(blockContentId)
            .then(() => {
                setDeleteClicked(!deleteClicked)
            })
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div id="longread">
            <Container>
                <Breadcrumb
                    style={{
                        marginTop: "20px",
                    }}
                >
                    <StyledBreadcrumb href="/explore/longreads">Longreads</StyledBreadcrumb>
                    <StyledBreadcrumb onClick={toLongreadPage}>{longreadData.title}</StyledBreadcrumb>
                    <StyledBreadcrumb active>{chapterData.name}</StyledBreadcrumb>
                </Breadcrumb>
                <Row xs={6} sm={2} md={2} lg={3} xl={4} className="g-4">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card
                            className="bg-dark text-white"
                            style={{
                                border: "none",
                                height: "300px",
                            }}
                        >
                            <StyledImage src={longreadData.img} />
                            <Card.ImgOverlay
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Card.Title
                                    style={{
                                        fontSize: "2.5rem",
                                        color: "white",
                                    }}
                                >
                                    {longreadData.title}
                                </Card.Title>
                                <Card.Text>
                                    {longreadData.desc}
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >

                        <div
                            style={{
                                marginRight: "20px",
                                marginBottom: "20px",
                                flexBasis: "100%",
                                flexGrow: 1,
                            }}
                        >
                            <h3>{chapterData.name}</h3>
                            <Container>
                                {blockContentsHolder.blockcontents.map((blockContent, idx) => (
                                    <Row key = {idx}>
                                        <BlockContentCard 
                                            longreadData={longreadData}
                                            chapterData={chapterData}
                                            blockData={blockContent}
                                            blockIdx={idx}
                                            onDeleteClicked ={onDeleteClicked}
                                        />
                                    </Row>
                                ))}
                            </Container>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
}

const StyledImage = styled(Card.Img)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const StyledBreadcrumb = styled(Breadcrumb.Item)`
  &:not(:first-child):before {
    content: "/" !important;
    color: rgba(0, 81, 85, 0.5) !important;
  }

  color: rgba(0, 81, 85, 0.5) !important;

  a {
    text-decoration: none;
    color: rgba(0, 81, 85, 1);
  }
`;

const StyledBreadcrumbActive = styled(Breadcrumb.Item)`
  // change the color
  color: rgba(0, 81, 85, 1) !important;
`;
