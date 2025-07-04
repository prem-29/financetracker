import React from 'react'
import { Modal, Form, Input, Button, Select } from 'antd'
import './styles.css'


function Account({ isCategoryVisible, handleCategoryCancel, onFinishCategory }) {

    const [form] = Form.useForm();
    const { Option } = Select;
    const typeData = [{ id: 1, name: 'Income' }, { id: 2, name: 'Expense' }]
    return (
        <Modal style={{ fontWeight: 600 }} title="Add Category" visible={isCategoryVisible} onCancel={handleCategoryCancel} footer={null}>
            <Form className='form_style' form={form} onFinish={(values) => {
                onFinishCategory(values, "category");
                form.resetFields();
            }}>
                <Form.Item label="Category" name="category" rules={[{
                    required: true,
                    message: "Please add category"
                }]}>
                    <Input type="text" className="inputStyle" />
                </Form.Item>
                <Form.Item label="Type" name="type" rules={[{
                    required: true,
                    message: "Please select Type!"
                }]}>
                    <Select defaultValue="">
                        <Option value="">Select</Option>
                        {typeData?.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <div className="button_container">
                    <Button type='primary' className='submit_btn' htmlType="submit">Submit</Button>
                </div>
            </Form>

        </Modal>
    )
}

export default Account