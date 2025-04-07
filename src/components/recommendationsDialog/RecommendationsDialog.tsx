import { FC, useEffect, useState } from 'react';
import { Dialog } from '../dialog';
import { Button } from '../button';
import { useAppDispatch } from '../../hooks/reduxToolkitHooks';
import { getGoalRecommendations } from '../../services/goalService';
import './recommendationsDialogStyles.scss';

interface RecommendationsDialogProps {
  goalId: number;
  goalTitle: string;
  open: boolean;
  onClose: () => void;
}

export const RecommendationsDialog: FC<RecommendationsDialogProps> = ({ 
  goalId, 
  goalTitle, 
  open, 
  onClose 
}) => {
  const dispatch = useAppDispatch();
  const [recommendations, setRecommendations] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await dispatch(getGoalRecommendations(goalId)).unwrap();
      setRecommendations(result);
    } catch (err) {
      setError('Не удалось получить рекомендации');
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRecommendations = (text: string) => {
    return text.split('\n').map((line, i) => (
      <div key={i} className="recommendation-item">
        {line.split('**').map((part, j) => 
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
      </div>
    ));
  };

  useEffect(() => {
    if (open) {
      fetchRecommendations();
    } else {
      setRecommendations('');
      setError(null);
    }
  }, [open]);

  return (
    <Dialog
      title={`Рекомендации для цели: ${goalTitle}`}
      open={open}
      onCancel={onClose}
      onSave={null} 
      cancelButtonType="primary"
    >
      <div className="recommendations-content">
        {isLoading ? (
          <div className="recommendations-loading">Загрузка рекомендаций...</div>
        ) : error ? (
          <div className="recommendations-error">
            {error}
            <Button 
              text="Попробовать снова" 
              onClick={fetchRecommendations}
              className="retry-button"
            />
          </div>
        ) : (
          <div className="recommendations-list">
            {formatRecommendations(recommendations)}
          </div>
        )}
      </div>
    </Dialog>
  );
};