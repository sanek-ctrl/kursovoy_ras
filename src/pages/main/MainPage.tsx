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

    const fetchGoals = async (isActive?: boolean) => {
        try {
            const goals = await Goals.getGoals(isActive);
            if (!goals) throw new Error('Данные не получены');

            const formattedGoals: Element[] = goals.map((goal: any) => ({
                id: goal.id,
                title: goal.title,
                goalInfo: [{
                    id: goal.id,
                    description: goal.description || '',
                    onCreated: goal.onCreated || new Date().toISOString(),
                    onUpdated: goal.onUpdated || new Date().toISOString(),
                    isActive: goal.isActive,
                }],
            }));

            setPartitionsData((prevPartitions) => prevPartitions.map((partition) => {
                if (partition.id === 1 && isActive === true) {
                    return { ...partition, elements: formattedGoals.filter((goal) => goal.goalInfo[0].isActive === true) };
                } else if (partition.id === 2 && isActive === false) {
                    return { ...partition, elements: formattedGoals.filter((goal) => goal.goalInfo[0].isActive === false) };
                }
                return partition;
            }));
        } catch (err) {
            console.error('Ошибка:', err);
        }
    };

    useEffect(() => { fetchGoals(true); }, []);

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
                        isActive: goalDetails.isActive,
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

                setPartitionsData((prevPartitions) => prevPartitions.map((partition) => {
                    if (partition.id === 1) return { ...partition, elements: [...partition.elements, newElement] };
                    return partition;
                }));

                setSelectedElementInfo({
                    id: newGoal.id,
                    description,
                    onCreated: new Date().toISOString(),
                    onUpdated: new Date().toISOString(),
                    isActive: true,
                });

                await fetchGoals(true);
            } else if (elementToEdit) {
                await Goals.editGoal({ id: elementToEdit.id, title, description });

                setPartitionsData((prevPartitions) => prevPartitions.map((partition) => ({
                    ...partition,
                    elements: partition.elements.map((element) => {
                        if (element.id === elementToEdit.id) {
                            return {
                                ...element,
                                title,
                                goalInfo: [{ ...element.goalInfo[0], description, onUpdated: new Date().toISOString() }],
                            };
                        }
                        return element;
                    }),
                })));

                setSelectedElementInfo((prevInfo) => prevInfo ? {
                    ...prevInfo,
                    title,
                    description,
                    onUpdated: new Date().toISOString(),
                } : null);
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

    const partitionChangedHandler = async (id?: string) => {
        if (id) {
            setSelectedPartitionId(+id);
            setSelectedElementId(null);
            setSelectedElementInfo(null);
            await fetchGoals(+id === 1);
        }
    };

    const onElementSelectedHandler = (id: number) => setSelectedElementId(id);
    const uploadFileHandler = () => console.log('Загрузка файла');
    const createElementHandler = () => { setUserActionMode('create'); setShowElementDialog(true); };

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

    const deleteElementHandler = async (id: number) => {
        try {
            await Goals.deleteGoal(id);
            setPartitionsData((prevPartitions) => prevPartitions.map((partition) => ({
                ...partition,
                elements: partition.elements.filter((element) => element.id !== id),
            })));

            if (selectedElementId === id) {
                setSelectedElementId(null);
                setSelectedElementInfo(null);
            }
        } catch (err) {
            console.error('Ошибка при удалении цели:', err);
        }
    };

    const closeElementDialogHandler = () => {
        setShowElementDialog(false);
        clearElementDialogFields();
    };

    const completeGoalHandler = async (id: number) => {
        try {
            await Goals.completeGoal(id);

            setPartitionsData((prevPartitions) => prevPartitions.map((partition) => ({
                ...partition,
                elements: partition.elements.map((element) => {
                    if (element.id === id) {
                        return {
                            ...element,
                            goalInfo: [{ ...element.goalInfo[0], isActive: false, onUpdated: new Date().toISOString() }],
                        };
                    }
                    return element;
                }),
            })));

            setSelectedElementInfo((prevInfo) => prevInfo ? {
                ...prevInfo,
                isActive: false,
                onUpdated: new Date().toISOString(),
            } : null);

            await fetchGoals(true);
        } catch (err) {
            console.error('Ошибка при завершении цели:', err);
        }
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
                        items={partitionsData.map((pd) => ({ text: pd.title, value: pd.id.toString() }))}
                        label="Разделы:"
                        selectedChanged={(val) => partitionChangedHandler(val)}
                    />
                    <PartitionList
                        partitionList={elements}
                        onItemClick={(id) => onElementSelectedHandler(id)}
                        onItemEdit={selectedPartitionId === 1 ? editElementHandler : undefined}
                        onItemDelete={deleteElementHandler}
                        selectedElementId={selectedElementId || undefined}
                        selectedPartitionId={selectedPartitionId}
                    />
                    {selectedPartitionId === 1 && (
                        <Button text="Добавить цель" className="main-page__btn" onClick={createElementHandler} />
                    )}
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
                        {selectedElementInfo.isActive && selectedPartitionId === 1 && (
                            <div>
                                <Button
                                    text="Завершить цель"
                                    className="main-page__btn"
                                    onClick={() => completeGoalHandler(selectedElementInfo.id)}
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