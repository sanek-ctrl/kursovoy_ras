import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layots';
import { Button, DropDown, PartitionList, Dialog, TextField } from '../../components';
import './mainPageStyles.scss'
import { Element  } from '../../types/models';

const staticElementsData = [
    { id: 1, title: 'Выучить Javascript' }, 
    { id: 2, title: 'Выучить С#' }, 
    { id: 3, title: 'Выучить Python'}, 
    { id: 4, title: 'Выучить C++'}
];

export const MainPage: FC = () => {

    const [elementData, setElementData] = useState<Array<Element>>([]);
    const [showElementDialog, setShowElementDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [elementToEdit, setElementToEdit] = useState(0);

    const [title, setTitle] = useState('');

    useEffect(() => {
        setElementData(staticElementsData);
    }, []);

    useEffect(() => {
        setTitle('');
        if (userActionMode === 'edit') {
            const element = userActionMode === 'edit'
                ? elementData.find(e => e.id === elementToEdit)
                :undefined;
        setTitle(element?.title ?? ''); 
        }
    }, [staticElementsData, userActionMode, elementToEdit]);

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

    return (
        <Layout>
            <div className="main-page">
                <div className="main-page__list-container">
                    <DropDown items={[{
                        text: 'Цели', value: '1'
                    },{
                        text: 'Достижения', value: '2'
                    }]} 
                    label='Выберите раздел:' 
                    selectedChanged={(val) => console.log(val)}
                    />
    
            <PartitionList 
                partitionList={ elementData }
                onItemClick={(id) => console.log(id)}
                onItemDelete={(id) => console.log('delete ', id)}
                onItemEdit={editElementHandler}
            />          
                <Button text="Добавить цель" className="main-page__add-goal-btn" onClick={createElementHandler}/>
                </div>
                <div>
                <Dialog title={userActionMode !== 'edit' ? 'Добавить цель' : 'Редактировать цель'}
                    open = {showElementDialog}
                    onSave={() => {}}
                    onCancel={() => setShowElementDialog(false)}
                >
                    {elementDialogContentRenderer()}
                </Dialog>
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