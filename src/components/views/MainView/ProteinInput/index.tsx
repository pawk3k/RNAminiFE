import { FileIcon } from '@assets/index';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import { useFileContext } from '@root/contextProviders/FileContextProvider';
import { FunctionComponent } from 'react';
import FileInput from './FileInput';
import LinkInput from './LinkInput';

const ProteinInput: FunctionComponent = () => {
  const [file] = useFileContext();
  return (
    <div className=" bg-purple-300 rounded-3xl shadow-md">
      <Tabs>
        {({ selectedIndex }): JSX.Element => {
          const getTabStyle = (index: number): object => ({
            borderBottom: `3px solid ${selectedIndex === index ? '#6100FF' : 'gray'}`,
            color: selectedIndex === index ? '#6100FF' : 'gray',
          });
          return (
            <>
              <TabList className="pt-5 px-16">
                <Tab className="w-full md:w-1/2 " style={getTabStyle(0)}>
                  Local file
                </Tab>
                <Tab className="w-full mt-5 md:mt-0 md:w-1/2 " style={getTabStyle(1)}>
                  Protein Data Bank
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel className="w-full">
                  {file ? (
                    <div className="flex flex-col justify-center items-center">
                      <div className="my-4">File uploaded succeed!</div>
                      <FileIcon className="w-20 h-20 m-16 mt-4" />
                    </div>
                  ) : (
                    <FileInput />
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
};
export default ProteinInput;
