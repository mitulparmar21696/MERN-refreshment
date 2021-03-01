import { useEffect, useState } from 'react'
import { Form, Input, Button, Select, message } from 'antd';
import * as actions from '../actions'
import { connect } from 'react-redux';


const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};



function UsersForm(props) {
    const [grades, setGrades] = useState([])

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        props.getGradeList()
        props.getSubjectList()
    }, [])
    useEffect(() => {
        if (props?.grades.length > 0) {
            setGrades(props?.grades)
        }
    }, [props.grades])
    useEffect(() => {

        if (props?.subjects?.length > 0) {

            setSubjects(props?.subjects)
        }
    }, [props.subjects])
    const [form] = Form.useForm();
    const onFinish = (values) => {

        values.role = Number(values.role)
        props.createUser(values)
        console.log(values);
    };

    return (
        <div className='login-form'>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="2">Teacher</Option>
                        <Option value="3">Student</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.role !== currentValues.role}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('role') === '2' ? (

                            <Form.Item
                                name="subject_id"
                                label="Subject"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                >
                                    {subjects.map((sub) => <Option value={sub._id}>{sub.name}</Option>)}
                                    <Option value="3">Student</Option>
                                </Select>
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>

                <Form.Item
                    name="grade_id"
                    label="Grade"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        {grades.map((gr) => <Option value={gr._id}>{gr.grade}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                    <Button type="danger" style={{ marginLeft: '10px' }} htmlType="submit">
                        Cancel
        </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isCreated: state.auth.isCreated,
        isGradePending: state.classConfig.isGradePending,
        grades: state.classConfig.grades,
        isSubjectsPending: state.classConfig.isSubjectsPending,
        subjects: state.classConfig.subjects,
    }
};
export default connect(mapStateToProps, actions)(UsersForm);

