import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    LoginOutlined
} from '@ant-design/icons';
import * as actions from '../../actions'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        }

        state = {
            collapsed: false
        }


        onCollapse = (collapsed) => {
            this.setState({ collapsed })

        };
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            console.log(this.props.match.path)
            if (!nextProps.authenticated) {
                this.props.history.push('/signin');
            }
        }

        render() {
            let { collapsed } = this.state;
            return <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item onClick={() => this.props.history.push('/teachers')} key="1" icon={<PieChartOutlined />}>
                            Teachers
                  </Menu.Item>
                        <Menu.Item key="2" onClick={() => this.props.history.push('/students')} icon={<DesktopOutlined />}>
                            Students
                  </Menu.Item>
                        <Menu.Item key="2" onClick={() => {
                            localStorage.removeItem('token')
                            this.props.signoutUser()
                            this.props.history.push('/signin')
                        }} icon={<LoginOutlined />}>
                            Log Out
                  </Menu.Item>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <ComposedComponent {...this.props} />
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                </Layout>
            </Layout>


        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps, actions)(Authentication);
}
