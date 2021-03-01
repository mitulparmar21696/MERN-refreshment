
import React, { useEffect, useState } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import {
    List, Avatar,
    Card, Spin, Button
} from 'antd';
import {
    UserAddOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

function Teachers(props) {
    const [teachers, setTeachers] = useState([])
    const [isLoader, setIsLoader] = useState(false)
    useEffect(() => {
        props.getListOfUser('teacher')
    }, [])

    useEffect(() => {

        if (props?.isPending) {

            setIsLoader(true)
        }
    }, [props.isPending])
    useEffect(() => {

        if (props?.users.length > 0) {
            setIsLoader(false)
            setTeachers(props.users)
        }
    }, [props.users])

    return (
        <>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ float: 'right' }} type="primary" onClick={() => props.history.push('/user-form/teacher')}><UserAddOutlined /></Button>
                <Button style={{ float: 'right', marginRight: '5px' }} type="primary"><EditOutlined /></Button>
                <Button style={{ float: 'right', marginRight: '5px' }} type="danger"><DeleteOutlined /></Button>

            </div>
            <div style={{ marginTop: '50px' }}>
                <div>
                    {!isLoader ? <Card>
                        <List
                            itemLayout="horizontal"
                            dataSource={teachers}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={<a href="https://ant.design">{item.name}</a>}
                                        description={item.email}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card> :
                        <Card>
                            <div className="example">
                                <Spin />
                            </div>

                        </Card>}

                </div>

            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isPending: state.user.isPending,
        users: state.user.users
    }
};


export default connect(mapStateToProps, actions)(Teachers);
