import { FilesActionTypes, TFilesState } from '@/types/files.types';
import { FilesActionReducer } from '@/types/store.types';

const defaultState: TFilesState = {
  sFilesDisplayMode: 'table',
  oCurrentPosition: {
    path: '/',
    parentId: null,
  },

  arFiles: [],
  bFilesNotFound: true,

  bShowCreateDirModal: false,
};

export default function fileReducer(
  state = defaultState,
  action: FilesActionReducer,
) {
  switch (action.type) {
    case FilesActionTypes.SET_FILES_MODE:
      return {
        ...state,
        sFilesDisplayMode: action.payload,
      };
    case FilesActionTypes.SET_FILES:
      return {
        ...state,
        arFiles: action.payload,
        bFilesNotFound: action.payload.length === 0,
      };
    case FilesActionTypes.SHOW_CREATE_DIR_MODAL:
      return {
        ...state,
        bShowCreateDirModal: action.payload,
      };
    default:
      return state;
  }
}
