import React from 'react'
import { Modal, Form, Input, DatePicker, Button, Select } from 'antd'


function Expenses({ isExpenseVisible, handleExpenseCancel, onFinish, accountData, categoryData, showAccountModal, showCategoryModal }) {
    const [form] = Form.useForm();
    const { Option } = Select;
    return (
        <Modal style={{ fontWeight: 600 }} title="Add Expenses" visible={isExpenseVisible} onCancel={handleExpenseCancel} footer={null}>
            <Form className='form_style' form={form} onFinish={(values) => {
                onFinish(values, "Expense");
                form.resetFields();
            }}>
                <Form.Item label="Expenses Name" name="expneses" rules={[{
                    required: true,
                    message: "Please add expenses name"
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
                <Form.Item label="Account" name="account" rules={[{
                    required: true,
                    message: "Please select Account!"
                }]}>
                    <Select defaultValue="" dropdownRender={menu => (
                        <>
                            {menu}
                            <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
                                <Button
                                    type="link"
                                    onClick={showAccountModal}
                                >
                                    + Add Account
                                </Button>
                            </div>
                        </>
                    )}>
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
                    <Select defaultValue="" dropdownRender={menu => (
                        <>
                            {menu}
                            <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
                                <Button
                                    type="link"
                                    onClick={showCategoryModal}
                                >
                                    + Add Category
                                </Button>
                            </div>
                        </>
                    )}>
                        <Option value="">Select</Option>
                        {categoryData?.map((item) => item.type === 2 ? (
                            <Option key={item.id} value={item.id}>
                                {item.category_name}
                            </Option>
                        ) : null)}
                    </Select>
                </Form.Item>
                <div className="button_container">
                    <Button type='primary' className='submit_btn' htmlType="submit">Submit</Button>
                </div>
            </Form>
        </Modal>
    )
}

export default Expenses