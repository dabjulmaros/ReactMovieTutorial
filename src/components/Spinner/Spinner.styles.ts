import styled from "styled-components";

export const Spinner = styled.div`
  border: 5px solid var(--lightGray);
  border-top: 5px solid var(--medGray);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
  margin: 20px auto;

  @keyframes spin{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(359deg);
    }
  }
`;