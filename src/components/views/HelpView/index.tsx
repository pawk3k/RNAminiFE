import { ListItem, OrderedList } from '@components/uiKit/OrderList';
import { SpaceSmall } from '@components/uiKit/Spacing';
import { Heading3, Heading4 as Heading4Base, BodySmall } from '@components/uiKit/Typography';

import React, { FunctionComponent } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { InPageLink } from './HelpView.styles';

export const Heading: StyledComponent<'h4', object, object, 'className'> = styled(
  Heading4Base,
).attrs({ className: 'text-dashas-pink border-b-2' })`
  ::before {
    content: '# ';
  }
`;

const HelpView: FunctionComponent = () => (
  <div className="p-16">
    <div className=" rounded-xl bg-dashas-pink p-4">
      <Heading3>Table Of Contents</Heading3>
      <OrderedList>
        <ListItem>
          <InPageLink>General information</InPageLink>
        </ListItem>
        <ListItem>How to use RNArefiner</ListItem>
        <ListItem>RNArefiner results</ListItem>
      </OrderedList>
    </div>

    <Heading>General Information</Heading>
    <SpaceSmall />
    <BodySmall>
      RNArefiner is a webserver which can be used as basic tool for RNA refinement. With 3D
      structure of RNA we extract 2D structure from it with RNApdbee and than we perform energetic
      minification with RNAComposer. RNArefiner tool allow you to fully automate process of RNA
      refinement.
    </BodySmall>
    <Heading>How to use RNArefiner</Heading>
    <SpaceSmall />
    <BodySmall>
      There are two options to upload RNA file for refinement:
      <OrderedList>
        <ListItem>
          From local system:
          <div className="text-black">
            Choose tab <strong>Local file</strong> and click on it or drag and drop the file.
          </div>
        </ListItem>
        <ListItem>
          From PDB Bank
          <div className="text-black">
            Choose tab <strong>Protein Data Bank</strong>.
          </div>
        </ListItem>
      </OrderedList>
    </BodySmall>
  </div>
);

export default HelpView;
