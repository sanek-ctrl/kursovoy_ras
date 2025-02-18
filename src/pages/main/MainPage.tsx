import { FC, useState } from 'react';
import { Layout } from '../../components/layots';
import { Button, DropDown, PartitionList, Dialog } from '../../components';
import './mainPageStyles.scss'

export const MainPage: FC = () => {

    const [showGoalDialog, setShowGoalDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');

    const createGoalHandler = () => {
        setUserActionMode('create');
        setShowGoalDialog(true);
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
    
            <PartitionList partitionList={[
                    { id: 1, title: 'Выучить Javascript' }, 
                    { id: 2, title: 'Выучить С#' }, 
                    { id: 3, title: 'Выучить Python'}, 
                    { id: 4, title: 'Выучить C++'} 
                ]}
                onItemClick={(id) => console.log(id)}
            />          
                <Button text="Добавить цель" className="main-page__add-goal-btn"/>
                </div>
                <div>
                <Dialog title={userActionMode !== 'edit' ? 'Добавить цель' : 'Редактировать цель'}>
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