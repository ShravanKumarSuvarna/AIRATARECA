/** @jsxImportSource @emotion/react */
import React from 'react';
import { motion } from 'framer-motion';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const moveHorizontal = keyframes`
  0% { transform: translateX(-80%) translateY(-10%); }
  50% { transform: translateX(80%) translateY(10%); }
  100% { transform: translateX(-80%) translateY(-10%); }
`;

const moveInCircle = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
`;

const moveVertical = keyframes`
  0% { transform: translateY(-60%); }
  50% { transform: translateY(60%); }
  100% { transform: translateY(-60%); }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 0;
  background: linear-gradient(to bottom, rgb(18, 18, 38), rgb(0, 17, 82));
`;

const AnimatedBlob = styled(motion.div)`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(${(props) => props.color}, 0.7) 0%,
    rgba(${(props) => props.color}, 0) 70%
  );
  filter: blur(150px);
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: screen;

  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
    filter: blur(80px);
  }
`;

const FrostedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const AnimatedBackground = () => (
  <>
    <BackgroundContainer>
      <AnimatedBlob
        color="18, 113, 255"
        css={css`
          top: 10%;
          left: 5%;
          animation: ${moveVertical} 20s ease-in-out infinite;

          @media (max-width: 600px) {
            top: 5%;
            left: 0%;
          }
        `}
      />
      <AnimatedBlob
        color="221, 74, 255"
        css={css`
          top: 40%;
          left: 70%;
          animation: ${moveInCircle} 60s linear infinite;

          @media (max-width: 600px) {
            top: 35%;
            left: 50%;
          }
        `}
      />
      <AnimatedBlob
        color="100, 220, 255"
        css={css`
          top: 60%;
          left: 20%;
          animation: ${moveHorizontal} 45s ease-in-out infinite;

          @media (max-width: 600px) {
            top: 55%;
            left: 10%;
          }
        `}
      />
      <AnimatedBlob
        color="255, 190, 70"
        css={css`
          top: 80%;
          left: 60%;
          animation: ${moveVertical} 25s ease-in-out infinite;

          @media (max-width: 600px) {
            top: 75%;
            left: 40%;
          }
        `}
      />
    </BackgroundContainer>
    <FrostedOverlay />
  </>
);

export default AnimatedBackground;
