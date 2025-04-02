import { FC } from 'react';
import { PartitionListProps } from './PartitionListProps';
import './partitionListStyles.scss';
import clsx from 'classnames';
import { PencilIcon, TrashIcon } from '../../assets/icons';

export const PartitionList: FC<PartitionListProps> = (props) => {
    const {
        partitionList,
        onItemClick,
        onItemDelete,
        onItemEdit,
        selectedElementId,
        selectedPartitionId,
    } = props;

    const partitionClickHandler = (id: number) => {
        onItemClick && onItemClick(id);
    };

    const partitionEditHandler = (id: number) => {
        console.log(`Editing item with id: ${id}`);
        onItemEdit && onItemEdit(id);
    };

    const partitionDeleteHandler = (id: number) => {
        onItemDelete && onItemDelete(id);
    };

    const isSelected = (id: number) => selectedElementId === id;

    return (
        <div className="element-list">
            {partitionList.map((element) => (
                <div
                    key={element.id} 
                    className={clsx('element-list__item', {
                        'element-list__item-selected': isSelected(element.id),
                    })}
                    onClick={() => partitionClickHandler(element.id)}
                >
                    <div className="element-list__item-title">
                        {element.title}
                    </div>
                    <div className="element-list__item_actions">
                        {selectedPartitionId === 1 && ( 
                            <PencilIcon
                            width={18}
                            height={18}
                            onClick={() => partitionEditHandler(element.id)} 
                        />
                        )}
                        <TrashIcon
                            width={18}
                            height={18}
                            onClick={() => partitionDeleteHandler(element.id)} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};