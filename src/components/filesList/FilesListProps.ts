import { GoalFile } from '../../types/models';

export interface FilesListProps {
    filesList: Array<GoalFile>;
    onFileDownload?: (displayName: string, systemName: string) => void;
    onFileDelete?: (id: number) => void;
    selectedPartitionId: number;
}