// import { OrderedList, ListItem } from '@components/uiKit/OrderList';
import { Space } from '@components/uiKit/Spacing';
import { BodySmall } from '@components/uiKit/Typography';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { Heading } from '../HelpView.styles';
import molstarpic from '../../../../../public/molstar.png';
import molprobity from '../../../../../public/molprobity.jpg';
import twodim from '../../../../../public/2d.png';

const OutputViewHelp: FunctionComponent = () => (
  <>
    <Heading id="output_view">RNArefiner results</Heading>
    <Space />
    <BodySmall>
      <div>3D structure visualization</div>
      <div className="flex justify-around gap-x-2">
        <figure>
          <Image src={molstarpic} width={500} height={500} />
          <figcaption>
            Input(<span className="text-red-400">red</span>) and output(
            <span className="text-green-400">green</span>) combined
          </figcaption>
        </figure>
        <p>
          On the solutions page you will see this visualization where red color represent input
          structure and green structure represents the same RNA after refinement process.
        </p>
      </div>
    </BodySmall>
    <Space />
    <BodySmall>
      <div className="flex justify-around gap-x-2">
        <figure>
          <Image src={molprobity} width={1400} height={500} />
          <figcaption>Comparison table</figcaption>
        </figure>
        <p>
          On the solutions page there is a table that compares stereochemical parameters of input
          and output.In addition there is an error count for both of them. There are also 3 possible
          colours of some some tables cells. Red - represents poor value of parameter. Yellow -
          represents good value of parameter. Green - represents excellent value of parameter.
        </p>
      </div>
    </BodySmall>
    <Space />
    <BodySmall>
      <div className="flex justify-around gap-x-2">
        <figure>
          <Image src={twodim} width={400} height={400} />
          <figcaption>2D structure</figcaption>
        </figure>
        <p>On the image on the right is 2d structure of input RNA.</p>
      </div>
    </BodySmall>
  </>
);

export default OutputViewHelp;
