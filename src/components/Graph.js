import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

function Graph({ data, graphSize }) {
  const [sum, setSum] = useState(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (graphSize === "large") {
      setSize(["5rem", "3rem"]);
    } else if (graphSize === "medium") {
      setSize(["3rem", "1rem"]);
    }
  }, [graphSize]);

  useEffect(() => {
    setSum(data?.reduce((a, b) => a + b, 0));
  }, [data]);

  const calcPercentage = (value) => {
    if (sum === null) {
      return 0;
    }

    return (value / sum) * 100;
  };

  const calcColor = (val) => {
    let rgb = [0, 0, 0];

    rgb[0] = Math.round(255 - calcPercentage(val) * 2.55);
    rgb[1] = Math.round(calcPercentage(val) * 2.55);

    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  };

  return (
    <Container>
      {data?.map((val, i) => (
        <GraphBar
          key={i}
          style={{
            width: `${calcPercentage(val)}%`,
            backgroundColor: calcColor(val),
            height: size[0],
          }}
        >
          <GraphText style={{ fontSize: size[1] }}>
            Answer {i + 1}: ({val} / {sum})
          </GraphText>
        </GraphBar>
      ))}
    </Container>
  );
}

export default Graph;

const Container = styled.div`
  width: 100%;
  /* background-color: #fff; */
`;

const GraphBar = styled.div`
  /* background-color: #ffff00; */
  height: 3rem;
  position: relative;
  box-shadow: 0 0 0.5rem rgba(0, 0, 2, 0.5);
  transition: all 0.5s;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const GraphText = styled.p`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  min-width: 75rem;
`;
