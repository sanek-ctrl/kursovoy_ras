import { Element } from '../../types/models'

export interface PartitionListProps {
    partitionList: Array<Element>;
    onItemClick?: (id: number) => void;
    onItemEdit?: (id: number) => void;
    onItemDelete?: (id: number) => void;
    selectedElementId?: number;
}