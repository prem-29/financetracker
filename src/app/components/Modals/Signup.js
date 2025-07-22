import React from "react";
import { Modal, Form, Input, Button } from 'antd'

function Signup({ isSignUpVisible, handleOnSignupCancel, onSignUp }) {
    const [form] = Form.useForm();
    return (
        <Modal centered style={{ fontWeight: 600 }} title={<div style={{ textAlign: 'center' }}>Sign Up</div>} onCancel={handleOnSignupCancel} visible={isSignUpVisible} footer={null}>
            <Form className='form_style' style={{ padding: 20 }} form={form} onFinish={(values) => {
                onSignUp(values);
                form.resetFields();
            }} layout="vertical"
                labelCol={{ span: 24 }}     // Label takes full width
                wrapperCol={{ span: 24 }} >
                <Form.Item label="User Name" name="name" rules={[{
                    required: true,
                    message: "Please add User Name!"
                }]}>
                    <Input type="text" className="inputStyle" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{
                    required: true,
                    message: "Please add email!"
                }]}>
                    <Input type="email" className="inputStyle" />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{
                    required: true,
                    message: "Please add Password!"
                }]}>
                    <Input type="password" className="inputStyle" />
                </Form.Item>
                <div className="button_container">
                    <Button type='primary' className='submit_btn' htmlType="submit">Submit</Button>
                </div>
            </Form>

        </Modal>
    )
}
export default Signup