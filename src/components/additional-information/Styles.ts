import styled from '../../utils/styled-components';

const StyledAdditionalInformation = styled.aside`
  width: 100%;

  padding: 1em;

  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};

  .aip-additional-info-content {
    * {
      max-width: 100%;

      &:last-child {
        margin-bottom: 0;
      }
    }

    ol,
    ul,
    figure {
      margin: 0 auto 0.5em;
    }

    ol,
    ul {
      padding: 0 0 0 1.2em;
    }

    figcaption {
      font-style: italic;
    }

    p {
      margin-top: 0;
    }
  }
`;

export default StyledAdditionalInformation;
