import React from 'react';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import './styles.css';


function AddIncome({ isIncomeVisible, handleIncomeCancel, onFinish, accountData, categoryData }) {
    const { Option } = Select;
    const [form] = Form.useForm();

    return (
        <Modal style={{ fontWeight: 600 }} title="Add Income" visible={isIncomeVisible} onCancel={handleIncomeCancel} footer={null}>
            <Form className='form_style' form={form} onFinish={(values) => {
                onFinish(values, "Income");
                form.resetFields();
            }}>
                <Form.Item label="Account" name="account" rules={[{
                    required: true,
                    message: "Please select Account!"
                }]}>
                    <Select defaultValue="">
                        <Option value="">Select</Option>
                        {accountData?.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.account_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Category" name="category" rules={[{
                    required: true,
                    message: "Please select Category!"
                }]}>
                    <Select defaultValue="">
                        <Option value="">Select</Option>
                        {categoryData?.map((item) => item.type === 1 ? (
                            <Option key={item.id} value={item.id}>
                                {item.category_name}
                            </Option>
                        ) : null)}
                    </Select>
                </Form.Item>
                <Form.Item label="Amount" name="amount" rules={[{
                    required: true,
                    message: "Please add amount!"
                }]}>
                    <Input type="number" className="inputStyle" />
                </Form.Item>
                <Form.Item label="Date" name="date" rules={[{
                    required: true,
                    message: "Please select date!"
                }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item label="Notes" name="notes">
                    <Input.TextArea className="inputStyle" rows={2} />
                </Form.Item>
                <div className="button_container">
                    <Button type='primary' className='submit_btn' htmlType="submit">Submit</Button>
                </div>
            </Form>

        </Modal>
    )
}

export default AddIncome