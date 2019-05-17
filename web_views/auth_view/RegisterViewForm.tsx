import * as React                                          from 'react';
import { Button, Checkbox, Form, Icon, Input, Typography } from 'antd';
import { I18N, I18NProps }                                 from '@utils/misc/i18n';
import { Dispatch }                                        from 'redux';
import { AppState, AuthStatus }                            from '@utils/redux/app_state';
import { Register }                                        from '@utils/redux/app/actions';
import { connect }                                         from 'react-redux';
import { FormComponentProps }                              from 'antd/lib/form';

// Props

export interface RegisterFormProps {
    switch: () => void;
}

interface RegisterFormRState {
    status: AuthStatus;
}

interface RegisterFormRDispatch {
    register: (username: string, password: string, email: string) => void;
}

type MergedRegisterFormProps = RegisterFormProps & RegisterFormRState & RegisterFormRDispatch & I18NProps & FormComponentProps;

class RegisterForm extends React.Component<MergedRegisterFormProps> {
    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        this.props.form.validateFields((err: Error, values: any) => {
            if (!err) {
                this.props.register(values.username, values.password, values.email);
            }
        });
    }

    handleRegister = (): void => {
        this.props.switch!();
    }

    render(): React.ReactNode {
        const {getFieldDecorator}: any = this.props.form;

        let warning = null;

        switch (this.props.status) {
            case AuthStatus.RegisterEmailAlreadyInUse:
                warning = <Typography.Text type='danger'>{this.props.t('register_email_already_in_use')}</Typography.Text>;
                break;
        }

        return <div style={{width: '62%'}}>
            <style>{`
                .register-form {
                    max-width: 300px;
                }
                .register-form-button {
                    width: 100%;
                }
                `}</style>
            <Form onSubmit={this.handleSubmit} className='register-form'>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: `${this.props.t('please_input_username')}`}],
                    })(
                        <Input
                            prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder={this.props.t('username')}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: `${this.props.t('please_input_email')}`}],
                    })(
                        <Input
                            prefix={<Icon type='mail' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type='email'
                            placeholder={this.props.t('email')}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: `${this.props.t('please_input_password')}`}],
                    })(
                        <Input
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type='password'
                            placeholder={this.props.t('password')}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('agreement', {
                        rules: [{required: true, message: `${this.props.t('please_agree')}`}],
                        valuePropName: 'checked',
                    })(
                        <Checkbox>{this.props.t('i_have_read_the')}<a href=''>{this.props.t('agreement')}</a></Checkbox>
                    )}
                </Form.Item>
                <Form.Item>
                    {warning}
                    <Button loading={this.props.status === AuthStatus.RegisterStarted} type='primary' htmlType='submit' className='register-form-button'>
                        {this.props.t('register')}
                    </Button>
                    <a onClick={this.handleRegister}>{this.props.t('login_now')}</a>
                </Form.Item>
            </Form>
        </div>;
    }
}

const mapStateToProps = (state: AppState): RegisterFormRState => ({
    status: state.app.auth_process_status
});
const mapDispatchToProps = (dispatch: Dispatch): RegisterFormRDispatch => ({
    register: (username: string, password: string, email: string): void => {
        dispatch(Register(username, password, email));
    }
});

export default Form.create({name: 'register'})(
    I18N.withNamespaces(['auth'])(
        connect(mapStateToProps, mapDispatchToProps)(
            RegisterForm
        )
    )
);
