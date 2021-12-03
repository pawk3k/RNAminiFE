import { FunctionComponent } from 'react';
import Disclosure from './Disclosure';

const AboutView: FunctionComponent = () => (
  <div className="mt-20">
    <Disclosure summary="About" details="RNArefiner is a bio informatics tool" />
    <Disclosure summary="Authors" details="kek" />
    <Disclosure summary="Acknowledgements and Funding" details="kek" />
  </div>
);

export default AboutView;
