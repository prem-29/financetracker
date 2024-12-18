import React from 'react'
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd'
import './styles.css'


function AddIncome({ isIncomeVisible, handleIncomeCancel, onFinish }) {
    const { Option } = Select;

    const [form] = Form.useForm();
    return (
        <Modal style={{ fontWeight: 600 }} title="Add Income" visible={isIncomeVisible} onCancel={handleIncomeCancel} footer={null}>
            <Form className='form_style' form={form} onFinish={(values) => {
                onFinish(values, "Income");
                form.resetFields();
            }}>
                <Form.Item label="Income Type" name="incomeType" rules={[{
                    required: true,
                    message: "Please add income type"
                }]}>
                    <Input type="text" className="inputStyle" />
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
                <Form.Item label="Tag" name="tagIncome" rules={[{
                    required: true,
                    message: "Please select Tag!"
                }]}>
                    <Select defaultValue="">
                        <Option value="">Select</Option>
                        <Option value="Salary">Salary</Option>
                        <Option value="Awards">Awards</Option>
                        <Option value="Coupons">Coupons</Option>
                        <Option value="Grants">Grants</Option>
                        <Option value="Lottery">Lottery</Option>
                        <Option value="Refunds">Refunds</Option>
                        <Option value="Rentals">Rental</Option>
                        <Option value="Sale">Sale</Option>
                    </Select>
                </Form.Item>
                <div className="button_container">
                    <Button type='primary' className='submit_btn' htmlType="submit">Submit</Button>
                </div>
            </Form>

        </Modal>
    )
}

export default AddIncome