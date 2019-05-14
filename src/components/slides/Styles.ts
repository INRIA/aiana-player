import styled from '../../utils/styled-components';

const Styles = styled.section`
  padding: 1em;

  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};

  .aip-slides-content {
    font-size: 1.125em;

    * {
      max-width: 100%;

      &:last-child {
        margin-bottom: 0;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ol,
    ul,
    figure {
      margin: 0 auto 0.5em;
    }

    h1 {
      font-size: 1.2em;
    }

    h2 {
      font-size: 1.1em;
    }

    h1,
    h2 {
      font-weight: bold;
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: normal;
    }

    h3,
    h4,
    h5,
    h6 {
      font-size: 1em;
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

  .aip-hl:nth-child(odd) {
    color: ${(props) => props.theme.bg};
    background-color: ${(props) => props.theme.highlight};
    padding: 0 0.2em;
  }
`;

export default Styles;
