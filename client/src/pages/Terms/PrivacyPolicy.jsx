import ReactMarkdown from 'react-markdown';
import privacyPolicy from '../content/PrivacyPolicy.md';

const PrivacyPolicy = () => {
  return (
      <ReactMarkdown>{privacyPolicy}</ReactMarkdown>
  );
};

export default PrivacyPolicy;