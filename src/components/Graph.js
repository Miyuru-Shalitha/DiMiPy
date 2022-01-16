import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

function Graph({ data }) {
  const [sum, setSum] = useState(null);

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

    rgb[0] = (255 - calcPercentage(val)) * 2.55;
    rgb[1] = calcPercentage(val) * 2.55;
    // rgb[2] = (255 / 2 - calcPercentage(val)) * 2.55;

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
          }}
        >
          <GraphText>
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
  background-color: #ffff00;
  height: 3rem;
  position: relative;
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
  min-width: 10rem;
`;
