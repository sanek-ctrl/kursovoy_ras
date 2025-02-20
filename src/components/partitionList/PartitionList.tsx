import { FC, useState } from 'react';
import { PartitionListProps } from './PartitionListProps';
import './partitionListStyles.scss'
import clsx from 'classnames'
import { PencilIcon, TrashIcon } from '../../assets/icons';

export const PartitionList: FC<PartitionListProps> = props => {
    const { partitionList, onItemClick, onItemDelete, onItemEdit } = props;
    const [selectedElement, setSelectedElement] = useState(0);

    const partitionClickHandler = ( id: number ) => {
        setSelectedElement(id);
        onItemClick && onItemClick;
    }

    const partitionEditHandler = (id: number) => {
        onItemEdit && onItemEdit(id);
    }

    const partitionDeleteHandler = (id: number) => {
        onItemDelete && onItemDelete(id);
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
                        <PencilIcon width={18} height={18} onClick={()=>{partitionEditHandler(element.id)}}/>
                        <TrashIcon width={18} height={18} onClick={()=>{partitionDeleteHandler(element.id)}}/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}