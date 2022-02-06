import { FunctionComponent } from 'react';
import Disclosure from './Disclosure';
import Link from './Link';

const AboutView: FunctionComponent = () => (
  <div className="w-full px-12">
    <div className="mt-20 ">
      <Disclosure
        summary="About"
        // details="RNArefiner: a webserver for 3D RNA structures refinement."
        details="RNArefiner: a webserver for 3D RNA structures refinement."
      />
      <Disclosure
        summary="Authors"
        details={
          <div className="whitespace-normal  ">
            Pavlo Ravliv<sup>1</sup>, Mariusz Popenda
            <sup>2</sup>, <Link href="http://www.cs.put.poznan.pl/tzok">Tomasz Zok</Link>
            <sup>1</sup>, Joanna Sarzynska<sup>2</sup>, Daria Poda<sup>1</sup>, Denys Hromniuk
            <sup>1</sup>,Roman Pylnyk<sup>1</sup>,
            <br />
            <Link href="http://www.cs.put.poznan.pl/mszachniuk">Marta Szachniuk</Link>
            <sup>1,2</sup>, <Link href="http://www.cs.put.poznan.pl/mantczak">Maciej Antczak</Link>
            <sup>1,2</sup>
            <br />
            <ol className="list-decimal">
              <li>
                <Link href="http://www2.cs.put.poznan.pl/en/">Institute of Computing Science</Link>{' '}
                and
                <Link href="http://www.ecbig.pl/">
                  {' '}
                  European Centre for Bioinformatics and Genomics
                </Link>
                , <Link href="http://www.put.edu.pl/">Poznan University of Technology</Link>, 60-965
                Poznan, Poland 2.
              </li>
              <li>
                <Link href="http://www.ibch.poznan.pl/en/home/">
                  Institute of Bioorganic Chemistry
                </Link>
                ,<Link href="http://institution.pan.pl/"> Polish Academy of Sciences</Link>, 61-704
                Poznan, Poland
              </li>
            </ol>
          </div>
        }
      />
      {/* <Disclosure summary="Acknowledgements and Funding" details="" /> */}
    </div>
  </div>
);

export default AboutView;
