import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layots';
import { Button, DropDown, PartitionList, Dialog, TextField, TextArea } from '../../components';
import './mainPageStyles.scss';
import { Partition, Element, GoalInfo } from '../../types/models';
import { DropDownItem } from '../../components/dropDown/DropDownProps';
import { UploadIcon } from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import {
    fetchGoals,
    fetchGoalById,
    createGoal,
    updateGoal,
    deleteGoal,
    completeGoal
  } from '../../services/goalService';
import { clearSelectedGoal } from '../../store/slices/goalSlice';
import { GoalDto } from '../../types/apiTypes';

  export const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    const { accessToken, role } = useAppSelector((state) => state.user);
    const {
      activeGoals,
      completedGoals,
      selectedGoal,
      loading,
      error,
    } = useAppSelector((state) => state.goal);
  
    const navigate = useNavigate();
    const [selectedPartitionId, setSelectedPartitionId] = useState<number>(1);
    const [selectedElementId, setSelectedElementId] = useState<number | null>(null);
    const [showElementDialog, setShowElementDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [elementToEdit, setElementToEdit] = useState<Element | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    // Преобразование GoalDto в Element
    const mapGoalToElement = (goal: GoalDto): Element => ({
      id: goal.id,
      title: goal.title,
      goalInfo: [{
        id: goal.id,
        description: goal.description,
        onCreated: goal.onCreated,
        onUpdated: goal.onUpdated,
        isActive: goal.isActive,
      }],
    });
  
    useEffect(() => {
      if (accessToken) {
        navigate(`${RoutesPaths.Main}`);
        dispatch(fetchGoals(true));
        dispatch(fetchGoals(false));
      } else {
        navigate(`${RoutesPaths.Login}`);
      }
    }, [accessToken, role, navigate, dispatch]);
  
    useEffect(() => {
      if (selectedElementId) {
        dispatch(fetchGoalById(selectedElementId));
      }
    }, [selectedElementId, dispatch]);
  
    const partitionsData: Partition[] = [
      { 
        id: 1, 
        title: 'Цели', 
        elements: activeGoals.map((goal: GoalDto) => mapGoalToElement(goal))
      },
      { 
        id: 2, 
        title: 'Достижения', 
        elements: completedGoals.map((goal: GoalDto) => mapGoalToElement(goal))
      }
    ];
  
    const saveElementHandler = async () => {
      try {
        if (userActionMode === 'create') {
          await dispatch(createGoal({ 
            title, 
            description,
            isActive: true 
          })).unwrap();
        } else if (elementToEdit) {
          await dispatch(updateGoal({ 
            id: elementToEdit.id, 
            title, 
            description 
          })).unwrap();
        }
        
        dispatch(fetchGoals(true));
        dispatch(fetchGoals(false));
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
        dispatch(clearSelectedGoal());
      }
    };
  
    const onElementSelectedHandler = (id: number) => setSelectedElementId(id);
  
    const createElementHandler = () => { 
      setUserActionMode('create'); 
      setShowElementDialog(true); 
    };
  
    const editElementHandler = (id: number) => {
      const currentPartition = partitionsData.find((p: Partition) => p.id === selectedPartitionId);
      const element = currentPartition?.elements.find((e: Element) => e.id === id);
  
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
        await dispatch(deleteGoal(id)).unwrap();
        if (selectedElementId === id) {
          setSelectedElementId(null);
          dispatch(clearSelectedGoal());
        }
      } catch (err) {
        console.error('Ошибка при удалении цели:', err);
      }
    };
  
    const completeGoalHandler = async (id: number) => {
      try {
        await dispatch(completeGoal(id)).unwrap();
        dispatch(fetchGoals(true));
        dispatch(fetchGoals(false));
      } catch (err) {
        console.error('Ошибка при завершении цели:', err);
      }
    };
  
    const closeElementDialogHandler = () => {
      setShowElementDialog(false);
      clearElementDialogFields();
    };
  
    const uploadFileHandler = () => console.log('Загрузка файла');
  
    const currentPartition = partitionsData.find((p: Partition) => p.id === selectedPartitionId);
    const elements = currentPartition ? currentPartition.elements : [];
    const selectedElementInfo = selectedGoal ? {
      id: selectedGoal.id,
      description: selectedGoal.description,
      onCreated: selectedGoal.onCreated,
      onUpdated: selectedGoal.onUpdated,
      isActive: selectedGoal.isActive,
    } : null;
  
    return (
      <Layout>
        <Dialog
          title={userActionMode === 'create' ? 'Добавить цель' : 'Редактировать цель'}
          open={showElementDialog}
          onSave={saveElementHandler}
          onCancel={closeElementDialogHandler}
        >
          <TextField 
            labelText="Название" 
            value={title} 
            onChange={(val: string) => setTitle(val)} 
          />
          <TextArea 
            labelText="Описание" 
            value={description} 
            onChange={(val: string) => setDescription(val)} 
          />
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