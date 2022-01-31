import { FileIcon } from '@assets/index';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import { useFileContext } from '@root/contextProviders/FileContextProvider';
import useOTPContext from '@root/contextProviders/OTPContext/useOTPContext';
import { FunctionComponent } from 'react';
import FileInput from './FileInput';
import LinkInput from './LinkInput';

const ProteinInput: FunctionComponent = () => {
  const [file, setFile] = useFileContext();
  const { characters } = useOTPContext();
  return (
    <div className=" rounded-3xl bg-dashas-pink shadow-md">
      <Tabs>
        {({ selectedIndex }): JSX.Element => {
          const getTabStyle = (index: number): object => ({
            borderBottom: `3px solid ${selectedIndex === index ? '#6100FF' : 'gray'}`,
            color: selectedIndex === index ? '#6100FF' : 'gray',
            whiteSpace: 'nowrap',
          });
          return (
            <>
              <TabList className="px-16 pt-5">
                <Tab
                  disabled={characters.join('').length === 4}
                  className="w-full md:w-1/2 "
                  style={getTabStyle(0)}
                >
                  Local file
                </Tab>
                <Tab
                  disabled={Boolean(file)}
                  className="mt-5 w-full md:mt-0 md:w-1/2 "
                  style={getTabStyle(1)}
                >
                  Protein Data Bank
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel className="w-full">
                  {file ? (
                    <div className="relative flex flex-col items-center justify-center">
                      <div className="my-4">File uploaded succeed!</div>
                      <button
                        className="absolute top-4 right-12 cursor-pointer"
                        type="button"
                        onClick={(): void => setFile('')}
                      >
                        x
                      </button>
                      <FileIcon className="m-16 mt-4 h-20 w-20" />
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
