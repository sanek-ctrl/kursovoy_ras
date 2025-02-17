import { FC, useState } from 'react';
import { PartitionListProps } from './PartitionListProps';
import './partitionListStyles.scss'
import clsx from 'classnames'
import { PencilIcon, TrashIcon } from '../../assets/icons';

export const PartitionList: FC<PartitionListProps> = props => {
    const { partitionList, onItemClick } = props;
    const [selectedElement, setSelectedElement] = useState(0);

    const partitionClickHandler = ( id: number ) => {
        setSelectedElement(id);
        onItemClick && onItemClick(id);
    }

    const isSelected = ( id: number ) => selectedElement === id;

    return (
        <div className='element-list'>
            {partitionList.map(element => {
                return(
                    <div key = {element.id} 
                    className={clsx('element-list', {'element-list__item-selected': isSelected(element.id)})}
                    onClick = {() => partitionClickHandler(element.id)}
                    >
                        <div className='element-list__item-title'>
                            {`${element.title}`}
                        </div>
                        <div className='element-list__item_actions'>
                        <PencilIcon width={18} height={18} />
                        <TrashIcon width={18} height={18} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}