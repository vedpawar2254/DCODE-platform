import ReactMarkdown from 'react-markdown';
import termsContent from '../content/TermsOfUse.md';

const TermsOfUse = () => {
  return (
      <ReactMarkdown>{termsContent}</ReactMarkdown>
  );
};

export default TermsOfUse;