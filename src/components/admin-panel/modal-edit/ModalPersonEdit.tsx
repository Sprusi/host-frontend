import React, { FC, memo, useCallback, useEffect } from 'react';

import { Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';

import { TokenRoles } from '@/components/login/type/TokenRoles';
import { Person } from '@/components/profile/type/Person';
import { Sex } from '@/components/profile/type/SexTypes';

import { InterfaceLabels } from '@/host-constants';
import { getRequiredRule, showError } from '@/utils/FormUtils';

import styles from '../AdminPanel.module.scss';

import { ProfileService } from '@/services';
import { MessageService } from '@/services/MessageService';

const { Item } = Form;

interface ModalProfileEditProps {
  recordState: [Person | undefined, (l: Person | undefined) => void];
  modalOpenState: [boolean, (l: boolean) => void];
  setUpdateNeeded: (l: boolean) => void;
}

const ModalProfileEdit: FC<ModalProfileEditProps> = ({ recordState, setUpdateNeeded, modalOpenState }) => {
  const [form] = Form.useForm();
  const [record, setRecord] = recordState;
  const [open, setOpen] = modalOpenState;

  useEffect(() => {
    form.setFieldsValue({
      firstName: record?.firstName,
      middleName: record?.middleName,
      lastName: record?.lastName,
      roles: record?.roles,
      sex: record?.sex,
      age: record?.age,
      height: record?.height,
      weight: record?.weight,
    });
  }, [record]);

  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then((formData) => {
        if (!record?.id) return MessageService.warn(InterfaceLabels.MP_PERSON_ID_ERROR);
        ProfileService.changeUserById(record?.id?.toString(), formData)
          .then(() => {
            setUpdateNeeded(true);
            handleCancel();
            MessageService.success();
          })
          .catch(showError);
      })
      .catch(() => MessageService.warn(InterfaceLabels.VALIDATION_ERROR));
  }, [form, record]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setRecord(undefined);
  }, []);

  return (
    <Modal
      title={InterfaceLabels.PERSON_MODAL_EDIT_TITLE}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={'70%'}
    >
      <Form form={form} layout="vertical" labelWrap wrapperCol={{ span: 24 }}>
        <Row gutter={54} wrap>
          <Col span={12} className={styles.modalLeftCol}>
            <Item rules={[getRequiredRule()]} name="firstName" label={InterfaceLabels.MP_MODAL_EDIT_FIELD.firstName}>
              <Input />
            </Item>
            <Item rules={[getRequiredRule()]} name="middleName" label={InterfaceLabels.MP_MODAL_EDIT_FIELD.middleName}>
              <Input />
            </Item>
            <Item name="lastName" label={InterfaceLabels.MP_MODAL_EDIT_FIELD.lastName}>
              <Input />
            </Item>
            <Item name="sex" label={InterfaceLabels.MP_MODAL_EDIT_FIELD.sex}>
              <Select options={Object.keys(Sex).map((value) => ({ value, label: Sex[value as keyof typeof Sex] }))} />
            </Item>
          </Col>

          <Col span={12}>
            <Item name="roles" label={InterfaceLabels.MP_MODAL_EDIT_FIELD.roles} rules={[getRequiredRule()]}>
              <Select
                mode="multiple"
                allowClear
                options={Object.keys(TokenRoles).map((value) => ({ value, label: Sex[value as keyof typeof Sex] }))}
              />
            </Item>
            <Row wrap>
              <Col xs={24} sm={24} md={12} lg={8}>
                <Item
                  name="age"
                  label={InterfaceLabels.MP_MODAL_EDIT_FIELD.age}
                  tooltip={InterfaceLabels.PERSON_RECOMMEND_CALCULATION_POP_UP}
                >
                  <InputNumber />
                </Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={8}>
                <Item
                  name="height"
                  label={InterfaceLabels.MP_MODAL_EDIT_FIELD.height}
                  tooltip={InterfaceLabels.PERSON_RECOMMEND_CALCULATION_POP_UP}
                >
                  <InputNumber />
                </Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={8}>
                <Item
                  name="weight"
                  label={InterfaceLabels.MP_MODAL_EDIT_FIELD.weight}
                  tooltip={InterfaceLabels.PERSON_RECOMMEND_CALCULATION_POP_UP}
                >
                  <InputNumber />
                </Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(ModalProfileEdit);
