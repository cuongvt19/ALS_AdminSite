import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { LoginForm } from "./loginForm";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoxContainer = styled.div`
  width: 400px;
  min-height: 650px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
  margin-top: 100px;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 130%;
  height: 650px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(80deg);
  top: -290px;
  left: -70px;
  background: rgb(33, 194, 2);
  background: linear-gradient(
    90deg,
    rgba(33, 194, 2, 1) 0%,
    rgba(28, 219, 93, 0.8729866946778712) 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 40px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 3em;
`;

export function AccountBox(props) {
  return (
    <AppContainer>
      <BoxContainer>
        <TopContainer>
          <BackDrop></BackDrop>
          <HeaderContainer>
            <HeaderText>ALS Vietnam</HeaderText>
            <HeaderText>Admin Site</HeaderText>
            <SmallText>Please sign-in to continue!</SmallText>
          </HeaderContainer>
        </TopContainer>
        <InnerContainer>
          <LoginForm />
        </InnerContainer>
      </BoxContainer>
    </AppContainer>
  );
}
