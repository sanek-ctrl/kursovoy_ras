import { FC, ChangeEvent } from 'react';
import './textAreaStyles.scss';
import clsx from 'classnames';

interface TextAreaProps {
  labelText?: string; 
  value: string; 
  onChange: (value: string) => void; 
  placeholder?: string; 
  rows?: number; 
  className?: string; 
  strongLabel?: boolean; 
  error?: boolean;
  errorMessage?: string; 
  successMessage?: string; 
  infoMessage?: string; 
}

export const TextArea: FC<TextAreaProps> = ({
  labelText,
  value,
  onChange,
  placeholder,
  rows = 3,
  className = '',
  strongLabel = false,
  error = false,
  errorMessage = '',
  successMessage = '',
  infoMessage = '',
}) => {
    
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={clsx('text-area-container', className)}>
      {labelText && (
        <label
          className={clsx('text-area-container__lbl', {
            'text-area-container__lbl_strong': strongLabel,
          })}
        >
          {labelText}
        </label>
      )}
      <textarea
        className={clsx('text-area-container__textarea', {
          'text-area-container__textarea_error': error,
        })}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
      />
      {(errorMessage || successMessage || infoMessage) && (
        <div
          className={clsx('text-area-container__info', {
            'text-area-container__info_error': errorMessage,
            'text-area-container__info_success': successMessage,
            'text-area-container__info_info': infoMessage,
          })}
        >
          {errorMessage || successMessage || infoMessage}
        </div>
      )}
    </div>
  );
};