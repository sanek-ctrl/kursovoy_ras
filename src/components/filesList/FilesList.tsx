import { FC } from 'react';
import { FilesListProps } from "./FilesListProps";
import { DownloadIcon, TrashIcon } from '../../assets/icons';
import './filesListStyles.scss';

export const FilesList: FC<FilesListProps> = ({ 
  filesList, 
  onFileDownload, 
  onFileDelete,
  selectedPartitionId
}) => {
  return (
    <div className="files-list">
      {filesList.length > 0 ? (
        filesList.map(file => (
          <div key={file.id} className="files-list__item">
            <div className="files-list__item-name">
              {file.displayName}
            </div>
            <div className='files-list__item-actions'>
              <DownloadIcon 
                width={16} 
                height={16} 
                onClick={() => onFileDownload?.(file.displayName, file.systemName)} 
              />
              {selectedPartitionId === 1 && (
                <TrashIcon 
                  width={16} 
                  height={16} 
                  onClick={() => onFileDelete?.(file.id)} 
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="files-list__empty">Нет прикрепленных файлов</div>
      )}
    </div>
  );
};