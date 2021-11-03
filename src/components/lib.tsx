import styled from "@emotion/styled";

export const Row = styled.div<{
  gap: number;
}>`
  display: flex;
  align-items: center;
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) => `${props.gap}rem`};
  }
`;

export const shopLabel = styled.span`
  display: flex;
`;
