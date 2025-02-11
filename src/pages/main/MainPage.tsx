import { FC } from 'react';
import { Layout } from '../../components/layots';

export const MainPage: FC = () => {
    return (
        <Layout footer={<>footer</>}>
            <div>MainPage</div>
        </Layout>
    );
}