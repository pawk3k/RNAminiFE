import { ListItem, OrderedList, BlListItem } from '@components/uiKit/OrderList';
import { Space, SpaceSmall } from '@components/uiKit/Spacing';
import { Heading3, BodySmall } from '@components/uiKit/Typography';

import React, { FunctionComponent } from 'react';
import { Heading, InPageLink } from './HelpView.styles';
import OutputViewHelp from './OutputViewHelp';

const HelpView: FunctionComponent = () => (
  <div className="p-16">
    <div className=" rounded-xl bg-dashas-pink p-4">
      <Heading3>Table Of Contents</Heading3>
      <OrderedList>
        <ListItem>
          <InPageLink href="#general_information">General information</InPageLink>
        </ListItem>
        <ListItem>
          <InPageLink href="#how_to_use">How to use RNArefiner</InPageLink>
        </ListItem>
        <ListItem>
          <InPageLink href="#output_view">RNArefiner results</InPageLink>
        </ListItem>
      </OrderedList>
    </div>

    <Heading id="general_information">General Information</Heading>
    <SpaceSmall />
    <BodySmall>
      RNArefiner is a webserver which can be used as basic tool for RNA refinement. With 3D
      structure of RNA we extract 2D structure from it with RNApdbee and than we perform energetic
      minification with RNAComposer. RNArefiner tool allow you to fully automate process of RNA
      refinement.
    </BodySmall>
    <Heading id="how_to_use">How to use RNArefiner</Heading>
    <SpaceSmall />
    <BodySmall>
      There are two options to upload RNA file for refinement:
      <OrderedList>
        <ListItem>
          From local system:
          <OrderedList>
            <BlListItem>
              Choose tab <strong>Local file</strong> and click on it or drag and drop the file.
            </BlListItem>
            <BlListItem>
              Click <strong>Submit</strong>.
            </BlListItem>
          </OrderedList>
        </ListItem>
        <ListItem>
          From PDB Bank
          <div>
            <OrderedList>
              <BlListItem>
                Choose tab <strong>Protein Data Bank</strong>.
              </BlListItem>
              <BlListItem>
                Enter PDB ID and click <strong>Submit</strong>.
              </BlListItem>
            </OrderedList>
          </div>
        </ListItem>
        <ListItem>Wait until you got redirected.</ListItem>
        <ListItem>You got redirected to the results page.</ListItem>
        <ListItem>Await until results are ready.</ListItem>
        <ListItem>Analyse your results.</ListItem>
      </OrderedList>
    </BodySmall>
    <Space />
    <BodySmall>
      Additionally RNArefiner can notify the users that their submitted task is completed.
      Notification is sent to the email address provided by the user. It contains a unique link to
      the result page. The link is valid for 2 weeks.
    </BodySmall>
    <Space />
    <OutputViewHelp />
  </div>
);

export default HelpView;
