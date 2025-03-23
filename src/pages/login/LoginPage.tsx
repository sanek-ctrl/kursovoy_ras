import { FC, useEffect, useState } from 'react';
import { TextField } from '../../components';
import { Button } from '../../components';
import { WidgetLayout } from '../../components/layots';
import './loginPageStyle.scss';
import { Route, useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks';
import { signIn } from '../../services';

export const LoginPage: FC = () => {
    const { accessToken, role } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) {
            navigate(RoutesPaths.Main);
        }
    }, [accessToken, role, navigate])

    const loginChangedHandler = (value: string) => {
        setLogin(value);
    }

    const passwordChangedHandler = (value: string) => {
        setPassword(value);
    }

    const loginHandler = () => {
        dispatch(signIn({login, password}));
    }

    const toRegisrationHandler = () => {
        navigate(RoutesPaths.Registration);
    };

    return (
        <WidgetLayout>
            <div className='login-page__form'>
                <h3 className='login-page__title'>Вход</h3>
                <div className='login-page__fields'>
                    <TextField labelText="Логин" value={login} type="text" onChange={loginChangedHandler} />
                    <TextField labelText="Пароль" value={password} type="password" onChange={passwordChangedHandler} />
                </div>
                <div className='login-page__actions'>
                    <Button text="Войти" onClick={loginHandler} type='primary'/>
                    <Button text="Зарегистрироваться" onClick={toRegisrationHandler} type='secondary'/>
                </div>
            </div>
        </WidgetLayout>
    )
}