import React from 'react';
import { useTranslation } from 'react-i18next';
import withWidget from '../hocs/with-widget';
import { markdownToJSX } from '../utils/strings';
import styled from '../utils/styled-components';
import AssistiveText from './a11y/AssistiveText';
import useId from '../hooks/useId';

interface IProps {
  text?: string;
}

const StyledAdditionalInformation = styled.section`
  width: 100%;

  padding: 1em;

  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};

  .aip-additional-info {
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

function AdditionalInformation({ text }: IProps) {
  const [t] = useTranslation();
  const [id] = useId();

  if (!text) {
    return null;
  }

  return (
    <StyledAdditionalInformation aria-labelledby={id}>
      <AssistiveText id={id}>{t('additional-info.title')}</AssistiveText>
      <div className="aip-additional-info">{markdownToJSX(text)}</div>
    </StyledAdditionalInformation>
  );
}

export default withWidget(AdditionalInformation);
