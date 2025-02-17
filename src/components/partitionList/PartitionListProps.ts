import { Element } from '../../types/models'

export interface PartitionListProps {
    partitionList: Array<Element>;
    onItemClick?: (id: number) => void;
}