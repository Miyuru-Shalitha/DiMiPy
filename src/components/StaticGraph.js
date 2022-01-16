import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import styled from "styled-components";

function StaticGraph() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const pathData = window.location.pathname;
    const answerCountStringArray = pathData.split("/")[2].split(",");
    setData(answerCountStringArray.map((item) => parseInt(item)));
  }, []);

  return (
    <Container>
      <GraphContainer>
        <Graph data={data} graphSize="large" />
      </GraphContainer>
    </Container>
  );
}

export default StaticGraph;

const Container = styled.div`
  background-color: #000;
  height: 100vh;
`;

const GraphContainer = styled.div`
  background-color: #d9d9d9;
  max-width: 80%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 0.5rem;
`;
