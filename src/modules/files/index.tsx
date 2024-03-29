import React, { useState, Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import styled from 'styled-components';

import DragAndDrop from './components/DragAndDrop';
import Table from './components/Table';

import Files from '@/api/Files';

import Breadcrumbs from '@/components/Breadcrumbs';
import { add, upload, cross } from '@/images';
import { search } from '@/images';
import {
  setFiles,
  setDisplayCreateDirModal,
  setSearchFileName,
  setCurrentOpenFile,
} from '@/store/reducers/fileReducer';
import { TSort } from '@/types/files.types';
import { IState } from '@/types/store.types';

import { StyledProps } from '@/types/styled';
import {
  emitErrorMessages,
  emitSuccessMessages,
} from '@/utils/toastifyActions';

const MyFiles = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const oFiles: Files = new Files();

  const [sSearch, setSearch] = useState('');
  const [bSearchActive, setSearchActive] = useState(false);
  const [arFilesUpload, setFilesUpload] = useState([] as File[]);

  const bFilesNotFound: boolean = useSelector(
    (state: IState) => state.files.bFilesNotFound,
  );
  const arSort: TSort[] = useSelector((state: IState) => state.files.arSort);
  const iLastCurrentOpenDir: number | null = useSelector(
    (state: IState) => state.files.iLastCurrentOpenDir,
  );
  const sSearchFileName: string = useSelector(
    (state: IState) => state.files.sSearchFileName,
  );

  const handleFocusSearch = () => {
    setSearchActive(true);
  };

  const handleBlurSearch = () => {
    setSearchActive(false);
  };

  const handleDisplayCreateDirModal = (sDisplayModal: boolean) => {
    dispatch(setDisplayCreateDirModal(sDisplayModal));
  };

  const handleSearchFileName = (sSearchFileName: string) => {
    setSearch(sSearchFileName);
    dispatch(setSearchFileName(sSearchFileName));
  };

  const handleOpenDir = (
    sFileType: string,
    oDir: { id: number; name: string },
  ) => {
    if (sFileType === 'dir') {
      dispatch(setSearchFileName(''));
      dispatch(setCurrentOpenFile(oDir));
    }
  };

  const handleDeleteFile = (iFileId: number): void => {
    oFiles
      .deleteFile(iFileId)
      .then((sFileName) => {
        emitSuccessMessages(`"${sFileName}" was successfully deleted`);
        getFiles();
      })
      .catch((err) => {
        emitErrorMessages(err);
      });
  };

  const handleFileUpload = (arFiles: File[]) => {
    setFilesUpload(arFiles);
    oFiles
      .uploadFile(arFiles, iLastCurrentOpenDir)
      .then((sSuccessMessage: string) => {
        getFiles();
        emitSuccessMessages(sSuccessMessage);
      })
      .catch((err) => {
        emitErrorMessages(err);
      });
  };

  const getFiles = async () => {
    dispatch(await setFiles(iLastCurrentOpenDir, arSort, sSearchFileName));
  };

  useEffect(() => {
    getFiles();
  }, [iLastCurrentOpenDir, arSort, sSearchFileName]);

  return (
    <section className='files' style={{ padding: '189px 0px 150px' }}>
      <Container>
        <Title>My files</Title>

        <Header>
          <Block>
            <Buttons>
              <CreateButton
                onClick={() => handleDisplayCreateDirModal(true)}
                title='Create Directory'
                type='button'
              >
                <IconButton src={add} alt='add'></IconButton>
              </CreateButton>

              <UploadButton title='Upload File' type='button'>
                <FileUploadLabel htmlFor='upload'>
                  <IconButton
                    disabled={bFilesNotFound}
                    src={upload}
                    alt='upload'
                  ></IconButton>
                </FileUploadLabel>
                <FileUpload
                  onChange={(event: Event | any) =>
                    handleFileUpload([...arFilesUpload, ...event.target.files])
                  }
                  id='upload'
                  type='file'
                  multiple
                />
              </UploadButton>
            </Buttons>
          </Block>

          <Block>
            <SearchInputWrapper bSearchActive={bSearchActive}>
              <SearchInput
                value={sSearch}
                onFocus={() => handleFocusSearch()}
                onBlur={() => handleBlurSearch()}
                onChange={(event: Event | any) => setSearch(event.target.value)}
                type='text'
                placeholder={bSearchActive ? 'Enter file name' : 'Сloud search'}
              />
              <SearchButton
                onClick={() => handleSearchFileName(sSearch)}
                src={search}
                alt='search'
              />
            </SearchInputWrapper>
            {sSearch && (
              <SearchButton
                onClick={() => handleSearchFileName('')}
                style={{ marginLeft: '10px' }}
                src={cross}
                alt='cross'
              />
            )}
          </Block>
        </Header>
        <Breadcrumbs />

        <Table
          handleDeleteFile={handleDeleteFile}
          handleOpenDir={handleOpenDir}
          getFiles={getFiles}
        />
        <DragAndDrop arFilesUpload={arFilesUpload} />
      </Container>
    </section>
  );
};

const Title = styled.h2`
  font-weight: 900;
  font-size: 72px;
  line-height: 70px;
  letter-spacing: 0.405em;
  text-transform: uppercase;
  color: #3b668d;
  text-align: center;
  margin-bottom: 80px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background: #f4f7fc;
  padding: 10px;
`;

const Block = styled.div`
  display: flex;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
`;

const SearchInputWrapper = styled.div`
  width: ${(props: StyledProps) => (props.bSearchActive ? '800px' : '185px')};
  padding: 11px 8px 12px 8px;
  background: #dae1ec;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: 0.2s ease-in;
`;

const SearchInput = styled.input`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  background: #dae1ec;
  color: rgba(46, 59, 82, 0.33);
  outline: none;
  border: none;
  width: 100%;
`;

const CreateButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 11px 15px 12px;
  background: #913e98;
  border-radius: 4px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  transition: 0.2s;

  :hover {
    opacity: 0.8;
  }
`;

const UploadButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 0;
  background: #f04438;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const FileUploadLabel = styled.label`
  padding: 11px 15px 12px;
  transition: 0.2s;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const FileUpload = styled.input`
  display: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconButton = styled.img`
  display: ${(props: StyledProps) => (props.bSearchActive ? 'none' : 'block')};
  cursor: pointer;
  width: 20px;
  height: 20px;

  transition: 0.2s;

  :hover {
    opacity: 0.8;
  }
`;

const SearchButton = styled.img`
  margin-left: auto;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    opacity: 0.8;
  }
`;
export default MyFiles;
