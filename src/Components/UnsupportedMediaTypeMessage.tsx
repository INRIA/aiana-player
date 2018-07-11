import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface IProps {
  mediaType?: string;
}

const UnsupportedMediaTypeMessage: React.SFC<IProps> = ({ mediaType }) => {
  return (
    <p>
      {mediaType && (
        <FormattedMessage
          id="app.unsupported_media_type"
          defaultMessage="Unsupported media type {mediaType}."
          values={{
            mediaType: <code>{mediaType}</code>
          }}
        />
      )}

      {!mediaType && (
        <FormattedMessage
          id="app.undefined_media_type"
          defaultMessage="Media type is undefined."
        />
      )}
    </p>
  );
};

export default UnsupportedMediaTypeMessage;
