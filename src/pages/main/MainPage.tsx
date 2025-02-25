import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layots';
import { Button, DropDown, PartitionList, Dialog, TextField, TextArea } from '../../components';
import './mainPageStyles.scss';
import { Partition, Element, GoalInfo } from '../../types/models';
import { DropDownItem } from '../../components/dropDown/DropDownProps';
import { UploadIcon } from '../../assets/icons';

const initialElementsData: Array<Element> = [
    { 
        id: 1, 
        title: 'Выучить Javascript', 
        goalInfo: [{
            id: 1,
            description: "Выучить основы JavaScript, включая синтаксис и структуры данных.",
            onCreated: '2023-01-01',
            onUpdated: '2023-01-10',
            isActive: true,
        }]
    }, 
    { 
        id: 2, 
        title: 'Выучить С#', 
        goalInfo: [{
            id: 2,
            description: "Изучение языка программирования C# и его применения в разработке приложений.",
            onCreated: '2023-01-05',
            onUpdated: '2023-01-15',
            isActive: true,
        }]
    }, 
    { 
        id: 3, 
        title: 'Выучить Python', 
        goalInfo: [{
            id: 3,
            description: "Основы Python, включая работу с библиотеками и фреймворками.",
            onCreated: '2023-01-10',
            onUpdated: '2023-01-20',
            isActive: true,
        }]
    }, 
    { 
        id: 4, 
        title: 'Выучить C++', 
        goalInfo: [{
            id: 4,
            description: "Изучение C++ и его особенностей, включая объектно-ориентированное программирование.",
            onCreated: '2023-01-15',
            onUpdated: '2023-01-25',
            isActive: true,
        }]
    }
];

const initialPartitionsData = [
    { id: 1, title: 'Цели', elements: initialElementsData },
    { id: 2, title: 'Достижения', elements: [] }
] as Array<Partition>;

export const MainPage: FC = () => {
    const [partitionsData, setPartitionsData] = useState<Array<Partition>>([]);
    const [elementData, setElementData] = useState<Array<Element>>([]);
    const [selectedPartitionId, setSelectedPartitionId] = useState<number>(1); 
    const [selectedElementId, setSelectedElementId] = useState<number>();
    const [showElementDialog, setShowElementDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [elementToEdit, setElementToEdit] = useState(0);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setTimeout(() => {
            console.log("Data loaded:", initialPartitionsData);
            setPartitionsData(initialPartitionsData); 
            if (Array.isArray(initialPartitionsData) && initialPartitionsData.length) {
                setElementData(initialPartitionsData[0].elements);
            }
        }, 2000);
    }, []);

    useEffect(() => {
        const selectedPartition = partitionsData.find(p => p.id === selectedPartitionId);
        setElementData(selectedPartition ? selectedPartition.elements : []);
        setSelectedElementId(undefined);
    }, [partitionsData, selectedPartitionId]);

    useEffect(() => {
        if (userActionMode === 'edit') {
            const element = elementData.find(e => e.id === elementToEdit);
            if (element) {
                setTitle(element.title); 
                setDescription(element.goalInfo[0].description); 
            }
        }
    }, [userActionMode, elementToEdit, elementData]);

    const clearElementDialogFields = () => {
        setUserActionMode('create');
        setElementToEdit(0);
        setTitle('');
        setDescription('');
    };

    const createElementHandler = () => {
        setUserActionMode('create');
        setShowElementDialog(true);
    };

    const editElementHandler = (id: number) => {
        setUserActionMode('edit');
        setElementToEdit(id); 
        setShowElementDialog(true); 
    };

    const saveElementHandler = () => {
        if (userActionMode === 'create') {
        } else {
            const updatedElements = elementData.map(e => {
                if (e.id === elementToEdit) {
                    return {
                        ...e,
                        title: title,
                        goalInfo: [{
                            ...e.goalInfo[0],
                            description: description,
                            onUpdated: new Date().toISOString().split('T')[0]
                        }]
                    };
                }
                return e;
            });
            setElementData(updatedElements);
        }
        setShowElementDialog(false);
        clearElementDialogFields();
    };

    const elementDialogContentRenderer = () => {
        return (
            <>
                <TextField labelText='Название' value={title} onChange={(val) => setTitle(val)} />
                <TextArea labelText='Описание' value={description} onChange={(val) => setDescription(val)} />
            </>
        );
    };

    const closeElementDialogHandler = () => {
        setShowElementDialog(false);
        clearElementDialogFields();
    };

    const partitionChangedHandler = (id?: string) => {
        if (id) {
            const _id = +id; 
            setSelectedPartitionId(_id);
        } else {
            setSelectedPartitionId(1);
        }
    };

    const onElementSelectedHandler = (id: number) => {
        setSelectedElementId(id);
    };

    const uploadFileHandler = () => {

    }

    const selectedElement = elementData.find(e => e.id === selectedElementId);

    return (
        <Layout>
            <Dialog
                title={userActionMode !== 'edit' ? 'Добавить цель' : 'Редактировать цель'}
                open={showElementDialog}
                onSave={saveElementHandler}
                onCancel={closeElementDialogHandler}
            >
                {elementDialogContentRenderer()}
            </Dialog>
            <div className="main-page">
                <div className="main-page__list-container">
                    <DropDown
                        items={partitionsData.map(pd => ({
                            text: pd.title,
                            value: pd.id.toString()
                        }))}
                        label="Разделы:"
                        selectedChanged={(val) => partitionChangedHandler(val)}
                    />
                    <PartitionList
                        partitionList={elementData}
                        onItemClick={(id) => onElementSelectedHandler(id)}
                        onItemDelete={(id) => console.log('delete ', id)}
                        onItemEdit={editElementHandler}
                        selectedElementId={selectedElementId}
                    />
                    <Button text="Добавить цель" className="main-page__btn" onClick={createElementHandler} />
                </div>
                {selectedElement ? (
                <div className="main-page__selected-element">
                    <div className="main-page__description">
                        <span>Описание</span>
                        <div>{selectedElement.goalInfo[0].description}</div>
                    </div>
                    <div className="main-page__dates">
                        <div>Дата создания: {selectedElement.goalInfo[0].onCreated}</div>
                        <div>Дата обновления: {selectedElement.goalInfo[0].onUpdated}</div>
                    </div>
                    <div className="main-page__files-list">
                        <div className="main-page__files-header">
                            <h3>Файлы</h3>
                            <div className="main-page__use-info-actions">
                                <UploadIcon onClick={uploadFileHandler} />
                            </div>
                        </div>
                        FilesList
                    </div>
                    <div>
                        <Button text="Завершить цель" className="main-page__btn"/>
                    </div>
                </div>
                ) : (
                    <div className="main-page__placeholder">
                    <h3>Выберите цель</h3>
                    <p>Для просмотра деталей выберите цель из списка слева.</p>
                    </div>
                )}
                
            </div>
        </Layout>
    );
};