import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  //box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
  margin-top: 2em;
`;

export const MutedLink = styled.a`
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 12px;
  color: rgb(71, 240, 38);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  height: 42px;
  width: 100%;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 15px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(71, 240, 38);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transittion: all, 240ms ease-in-out;
  background: rgb(33, 194, 2);
  background: linear-gradient(
    90deg,
    rgba(33, 194, 2, 1) 0%,
    rgba(28, 219, 93, 0.8729866946778712) 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;

export const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FieldError = styled.span`
  color: #b32e2e;
  font-size: 14px;
  min-height: 18px;
`;
