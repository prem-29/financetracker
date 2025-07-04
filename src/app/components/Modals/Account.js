import React from 'react'
import { Modal, Form, Input, Button } from 'antd'
import './styles.css'


function Account({ isAccountVisible, handleAccountCancel, onFinishAccount }) {

    const [form] = Form.useForm();
    return (
        <Modal style={{ fontWeight: 600 }} title="Add Account" visible={isAccountVisible} onCancel={handleAccountCancel} footer={null}>
            <Form className='form_style' form={form} onFinish={(values) => {
                onFinishAccount(values);
                form.resetFields();
            }}>
                <Form.Item label="Account" name="account" rules={[{
                    required: true,
                    message: "Please add account"
                }]}>
                    <Input type="text" className="inputStyle" />
                </Form.Item>
                <div className="button_container">
                    <Button type='primary' className='submit_btn' htmlType="submit">Submit</Button>
                </div>
            </Form>

        </Modal>
    )
}

export default Account