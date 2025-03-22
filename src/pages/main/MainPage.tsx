import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layots';
import { Button, DropDown, PartitionList, Dialog, TextField, TextArea } from '../../components';
import './mainPageStyles.scss';
import { Partition, Element, GoalInfo } from '../../types/models';
import { DropDownItem } from '../../components/dropDown/DropDownProps';
import { UploadIcon } from '../../assets/icons';
import { Goals } from '../../api/goals';

const initialPartitionsData: Partition[] = [
    { id: 1, title: 'Цели', elements: [] },
    { id: 2, title: 'Достижения', elements: [] }
];

export const MainPage: FC = () => {
    const [partitionsData, setPartitionsData] = useState<Partition[]>(initialPartitionsData);
    const [selectedPartitionId, setSelectedPartitionId] = useState<number>(1); 
    const [selectedElementId, setSelectedElementId] = useState<number | null>(null); 
    const [selectedElementInfo, setSelectedElementInfo] = useState<GoalInfo | null>(null); 
    const [showElementDialog, setShowElementDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [elementToEdit, setElementToEdit] = useState<Element | null>(null); 

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchGoals = async () => {
        try {
            const goals = await Goals.getGoals();

            if (!goals) {
                throw new Error('Данные не получены');
            }

            const formattedGoals: Element[] = goals.map((goal: any) => ({
                id: goal.id,
                title: goal.title,
                goalInfo: [{
                    id: goal.id,
                    description: goal.description || '',
                    onCreated: goal.onCreated || new Date().toISOString(),
                    onUpdated: goal.onUpdated || new Date().toISOString(),
                    isActive: goal.isActive || true,
                }],
            }));

            setPartitionsData([
                { id: 1, title: 'Цели', elements: formattedGoals },
                { id: 2, title: 'Достижения', elements: [] },
            ]);
        } catch (err) {
            console.error('Ошибка:', err);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    useEffect(() => {
        const fetchGoalDetails = async () => {
            if (selectedElementId) {
                try {
                    const goalDetails = await Goals.getGoal(selectedElementId);

                    setSelectedElementInfo({
                        id: goalDetails.id,
                        description: goalDetails.description || '',
                        onCreated: goalDetails.onCreated || new Date().toISOString(),
                        onUpdated: goalDetails.onUpdated || new Date().toISOString(),
                        isActive: goalDetails.isActive || true,
                    });
                } catch (err) {
                    console.error('Ошибка:', err);
                }
            }
        };

        fetchGoalDetails();
    }, [selectedElementId]);

    const saveElementHandler = async () => {
        try {
            if (userActionMode === 'create') {
                const newGoal = await Goals.addGoal({ title, description, isActive: true });

                const newElement: Element = {
                    id: newGoal.id,
                    title,
                    goalInfo: [{
                        id: newGoal.id,
                        description,
                        onCreated: new Date().toISOString(),
                        onUpdated: new Date().toISOString(),
                        isActive: true,
                    }],
                };

                setPartitionsData((prevPartitions) => {
                    return prevPartitions.map((partition) => {
                        if (partition.id === 1) {
                            return {
                                ...partition,
                                elements: [...partition.elements, newElement],
                            };
                        }
                        return partition;
                    });
                });

                setSelectedElementInfo({
                    id: newGoal.id,
                    description,
                    onCreated: new Date().toISOString(),
                    onUpdated: new Date().toISOString(),
                    isActive: true,
                });
            } else if (elementToEdit) {
                await Goals.editGoal({ id: elementToEdit.id, title, description });

                setPartitionsData((prevPartitions) => {
                    return prevPartitions.map((partition) => {
                        return {
                            ...partition,
                            elements: partition.elements.map((element) => {
                                if (element.id === elementToEdit.id) {
                                    return {
                                        ...element,
                                        title,
                                        goalInfo: [{
                                            ...element.goalInfo[0],
                                            description,
                                            onUpdated: new Date().toISOString(),
                                        }],
                                    };
                                }
                                return element;
                            }),
                        };
                    });
                });

                setSelectedElementInfo((prevInfo) => {
                    if (!prevInfo) return null;

                    return {
                        ...prevInfo,
                        title,
                        description,
                        onUpdated: new Date().toISOString(),
                    };
                });
            }
        } catch (err) {
            console.error('Ошибка:', err);
        } finally {
            setShowElementDialog(false);
            clearElementDialogFields();
        }
    };

    const clearElementDialogFields = () => {
        setUserActionMode('create');
        setElementToEdit(null);
        setTitle('');
        setDescription('');
    };

    const partitionChangedHandler = (id?: string) => {
        if (id) {
            setSelectedPartitionId(+id);
            setSelectedElementId(null);
            setSelectedElementInfo(null);
        }
    };

    const onElementSelectedHandler = (id: number) => {
        setSelectedElementId(id);
    };

    const uploadFileHandler = () => {
        console.log('Загрузка файла');
    };

    const createElementHandler = () => {
        setUserActionMode('create');
        setShowElementDialog(true);
    };

    const editElementHandler = (id: number) => {
        const element = partitionsData
            .find((p) => p.id === selectedPartitionId)
            ?.elements.find((e) => e.id === id);

        if (element) {
            setTitle(element.title);
            setDescription(element.goalInfo[0].description);
            setElementToEdit(element);
            setUserActionMode('edit');
            setShowElementDialog(true);
        }
    };

    const closeElementDialogHandler = () => {
        setShowElementDialog(false);
        clearElementDialogFields();
    };

    const currentPartition = partitionsData.find((p) => p.id === selectedPartitionId);
    const elements = currentPartition ? currentPartition.elements : [];

    return (
        <Layout>
            <Dialog
                title={userActionMode === 'create' ? 'Добавить цель' : 'Редактировать цель'}
                open={showElementDialog}
                onSave={saveElementHandler}
                onCancel={closeElementDialogHandler}
            >
                <TextField labelText="Название" value={title} onChange={(val) => setTitle(val)} />
                <TextArea labelText="Описание" value={description} onChange={(val) => setDescription(val)} />
            </Dialog>
            <div className="main-page">
                <div className="main-page__list-container">
                    <DropDown
                        items={partitionsData.map((pd) => ({
                            text: pd.title,
                            value: pd.id.toString(),
                        }))}
                        label="Разделы:"
                        selectedChanged={(val) => partitionChangedHandler(val)}
                    />
                    <PartitionList
                        partitionList={elements}
                        onItemClick={(id) => onElementSelectedHandler(id)}
                        onItemEdit={editElementHandler}
                        selectedElementId={selectedElementId || undefined}
                    />
                    <Button text="Добавить цель" className="main-page__btn" onClick={createElementHandler} />
                </div>
                {selectedElementInfo ? (
                    <div className="main-page__selected-element">
                        <div className="main-page__description">
                            <span>Описание</span>
                            <div>{selectedElementInfo.description}</div>
                        </div>
                        <div className="main-page__dates">
                            <div>Дата создания: {selectedElementInfo.onCreated}</div>
                            <div>Дата обновления: {selectedElementInfo.onUpdated}</div>
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
                        {selectedElementInfo.isActive && (
                            <div>
                                <Button
                                    text="Завершить цель"
                                    className="main-page__btn"
                                    onClick={() => console.log('Завершение цели')}
                                />
                            </div>
                        )}
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