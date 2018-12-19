import styled from '../../utils/styled-components';

const Styles = styled.section`
  position: absolute;
  top: 0%;
  right: 40%;
  bottom: 40%;
  left: 0%;

  padding: 1em;

  line-height: 1.5;
  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};

  .aip-slides-content {
    height: 100%;
    font-size: 1rem;
    overflow: auto;

    * {
      max-width: 100%;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1;
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
`;

export default Styles;
