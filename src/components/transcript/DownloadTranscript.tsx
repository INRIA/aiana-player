import React from 'react';
import { saveAs } from 'file-saver';
import { useTranslation } from 'react-i18next';
import Button from '../shared/Button';

interface IProps {
  filename?: string;
  selector?: string;
}

function DownloadTranscript({
  selector = '.aip-transcript__text',
  filename = 'transcript.txt'
}: IProps) {
  const [t] = useTranslation();

  return (
    <Button
      className="button--small"
      onClick={() => {
        const el = document.querySelector(selector) as HTMLElement;
        const text = el.innerText;
        const blob = new Blob([text], {
          type: 'text/plain;charset=utf-8'
        });
        saveAs(blob, filename);
      }}
    >
      {t('transcript.download.label')}
    </Button>
  );
}

export default DownloadTranscript;
