import { FC } from 'react';
import { DialogProps } from './DialogProps';
import './dialogStyles.scss';
import clsx from 'classnames';
import { Button } from '../button';

export const Dialog: FC<DialogProps> = props => {
    const { className, title, children, onCancel, onSave, open=true } = props; 

    if (!open) { 
        return null;
    }

    return (
        <div className='dialog' onClick={onCancel}>
            <div className={clsx('dialog__paper', className)} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                }}>
                <div>
                    <h4 className='dialog__header'> {title} </h4>
                </div>
                <div className='dialog__body'>
                    {children}
                </div>
                <div className='dialog__footer'>
                    <Button type='primary' text='Сохранить' onClick={onSave}/>
                    <Button type='secondary' text='Отмена' onClick={onCancel}/>
                </div>
            </div>
        </div>
    )
}