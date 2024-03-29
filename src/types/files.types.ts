export type TFilesState = {
  sSearchFileName: string;

  arCurrentOpenDirs: number[] | [];
  arBreadCrumbs: TBreadCrumb[] | [];
  iLastCurrentOpenDir: number | null;

  arFiles: [];
  bFilesNotFound: boolean;

  bShowCreateDirModal: boolean;

  arSort: TSort[] | [];
};

export type TFile = {
  size: number;
  path: string;
  date: string;
  id: number;
  name: string;
  type: string;
  format: string;
  userId: number;
  parentId: number | null;
  updatedAt: string;
  createdAt: string;
  access: string;
};

export type TDirCreation = {
  name: string;
  type: string;
  format: string;
  access: string;
  path: string;
  userId: number;
  parentId: number | null;
};

export type TDisplayProps = {
  handleDeleteFile: Function;
  handleOpenDir: Function;
  getFiles: Function;
};

export type TDragAndDropProps = {
  arFilesUpload: File[];
};

export type TSort = {
  field: string;
  order: string;
};

export type TBreadCrumb = {
  id: number;
  name: string;
};

export enum FilesActionTypes {
  SET_FILES = 'SET_FILES',
  SET_DISPLAY_CREATE_DIR_MODAL = 'SET_DISPLAY_CREATE_DIR_MODAL',
  SET_CURRENT_OPEN_FILE = 'SET_CURRENT_OPEN_FILE',
  BACK_CURRENT_OPEN_FILE = 'BACK_CURRENT_OPEN_FILE',
  SET_SEARCH_FILE_NAME = 'SET_SEARCH_FILE_NAME',
  SET_SORT = 'SET_SORT',
}
