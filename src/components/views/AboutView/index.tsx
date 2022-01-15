import { FunctionComponent } from 'react';
import Disclosure from './Disclosure';

const AboutView: FunctionComponent = () => (
  <div className="mt-20">
    <Disclosure summary="About" details="RNArefiner is a bio informatics tool" />
    <Disclosure
      summary="Authors"
      details={['Pavlo Ravliv\n', 'Denys Hromniuk\n', 'Daria Poda\n', 'Roman Pylnyk\n'].join('')}
    />
    <Disclosure summary="Acknowledgements and Funding" details="None" />
  </div>
);

export default AboutView;
