import { FC } from 'react';
import { Layout } from '../../components/layots';

export const NoPermissionsPage: FC = () => {
    return (
        <Layout title="Личный дневник целей и достижений">
            <h2>У Вас недостаточно прав для работы в системе.</h2>
            <h4>Пожалуйста, ожидайте, пока администратор рассмотрит Вашу заявку на работу в системе.</h4>
        </Layout>
    );
};