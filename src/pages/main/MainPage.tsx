import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layots';
import { Button, DropDown, PartitionList, Dialog, TextField } from '../../components';
import './mainPageStyles.scss'
import { Partition, Element  } from '../../types/models';
import { DropDownItem } from '../../components/dropDown/DropDownProps';

const staticElementsData = [
    { id: 1, title: 'Выучить Javascript' }, 
    { id: 2, title: 'Выучить С#' }, 
    { id: 3, title: 'Выучить Python'}, 
    { id: 4, title: 'Выучить C++'}
] as Array<Element>;

const partitionsData = [
    {id: 1, title: 'Цели', elements: staticElementsData},
    {id: 2, title: 'Достижения', elements: []}
] as Array<Partition>;

export const MainPage: FC = () => {

    const [partitionsData, setPartitionsData] = useState<Array<Partition>>([]);
    const [elementData, setElementData] = useState<Array<Element>>([]);
    const [selectedPartitionId, setSelectedPartitionId] = useState<number>();
    const [selectedElementId, setSelectedElementId] = useState<number>();
    const [showElementDialog, setShowElementDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [elementToEdit, setElementToEdit] = useState(0);

    const [title, setTitle] = useState('');

    useEffect(() => {
        setTimeout( () => {
            setPartitionsData(partitionsData);
            if(Array.isArray(partitionsData) && partitionsData.length) {
                setElementData(partitionsData[0].elements)
            }
        }, 2000)
    }, []);

    useEffect(() => {
        const selectedPartition = partitionsData.find( p => p.id === selectedPartitionId);
        setElementData(selectedPartition ? selectedPartition.elements : []);
        setSelectedElementId(undefined);
    }, [partitionsData,selectedPartitionId]);

    useEffect(() => {
        clearElementDialogFields();
        if (userActionMode === 'edit') {
            const element = userActionMode === 'edit'
                ? elementData.find(e => e.id === elementToEdit)
                :undefined;
        setTitle(element?.title ?? ''); 
        }
    }, [staticElementsData, userActionMode, elementToEdit]);

    const clearElementDialogFields = () => {
        setTitle('');
    }

    const createElementHandler = () => {
        setUserActionMode('create');
        setShowElementDialog(true);
    }

    const editElementHandler = (id: number) => {
        setUserActionMode('edit');
        setElementToEdit(id);
        setShowElementDialog(true);
    }

    const elementDialogContentRenderer = () => {
        return (
            <>
                <TextField labelText='Название' value={title} onChange={(val) => setTitle(val)} />
            </>
        );
    }

    const closeElementDialogHandler = () => {
        setShowElementDialog(false);
        clearElementDialogFields();
    }

    const partitionChangedHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedPartitionId(_id);
    }

    const onElementSelectedHandler = (id: number) => {
        setSelectedElementId(id);
    }

    return (
        <Layout>
            <Dialog title={userActionMode !== 'edit' ? 'Добавить цель' : 'Редактировать цель'}
                    open = {showElementDialog}
                    onSave={() => {}}
                    onCancel={closeElementDialogHandler}
                >
                    {elementDialogContentRenderer()}
                </Dialog>
            <div className="main-page">
                <div className="main-page__list-container">
                    <DropDown items={partitionsData.map(pd => {
                        return { 
                            text: pd.title,
                            value: pd.id.toString()
                        } as DropDownItem;
                    })}
                        label="Разделы:"
                        selectedChanged={(val) => partitionChangedHandler(val)}
                    />
    
            <PartitionList partitionList={ elementData }
                onItemClick={(id) => onElementSelectedHandler(id)}
                onItemDelete={(id) => console.log('delete ', id)}
                onItemEdit={editElementHandler}
            />          
                <Button text="Добавить цель" className="main-page__add-goal-btn" onClick={createElementHandler}/>
                </div>
                <div>
                    <div>
                        <span>Описание</span>
                        <div>*</div>
                    </div>
                    <div>
                        <div>Дата создания</div>
                        <div>Дата обновления</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}