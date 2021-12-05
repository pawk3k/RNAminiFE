import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import FileInput from './FileInput';
import LinkInput from './LinkInput';
import FileSvg from '../../../../assets/FileSvg';

const ProteinInput: FunctionComponent<{
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
}> = ({ setFile, file }) => (
  <div className="h-96 relative bg-purple-300 rounded-3xl shadow-md">
    <Tabs>
      {({ selectedIndex }): JSX.Element => {
        const getTabStyle = (index: number): object => ({
          borderBottom: `3px solid ${selectedIndex === index ? '#6100FF' : 'gray'}`,
          color: selectedIndex === index ? '#6100FF' : 'gray',
        });
        return (
          <>
            <TabList className="pt-5 px-16">
              <Tab className="w-1/2 outline-none" style={getTabStyle(0)}>
                Local file
              </Tab>
              <Tab className="w-1/2 outline-none" style={getTabStyle(1)}>
                Protein Data Bank
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="absolute h-5/6 mt-4 w-full">
                {file ? (
                  <div className="flex flex-col justify-center items-center h-5/6">
                    <div className="mb-4">File uploaded sucseed!</div>
                    <FileSvg />
                  </div>
                ) : (
                  <FileInput setFile={setFile} />
                )}
              </TabPanel>
              <TabPanel>
                <LinkInput />
              </TabPanel>
            </TabPanels>
          </>
        );
      }}
    </Tabs>
  </div>
);
export default ProteinInput;
