import React, { FC, memo, useCallback, useEffect } from 'react';

import { Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';

import { InterfaceLabels } from '@/host-constants';
import { getRequiredRule } from '@/utils/formUtils';

import styles from '../Profile.module.scss';
import { Person } from '../type/Person';
import { Sex } from '../type/SexTypes';

import { useToken } from '@/hook/useToken';
import { ProfileService } from '@/services';
import { MessageService } from '@/services/MessageService';

const { Item } = Form;

interface ModalProfileEditProps {
  person: Person | undefined;
  setUpdateNeeded: (l: boolean) => void;
  modalOpenState: [boolean, (l: boolean) => void];
}

const ModalProfileEdit: FC<ModalProfileEditProps> = ({ person, setUpdateNeeded, modalOpenState }) => {
  const { payload } = useToken();
  const [form] = Form.useForm();

  const [open, setOpen] = modalOpenState;

  useEffect(() => {
    form.setFieldsValue({
      firstName: person?.firstName,
      middleName: person?.middleName,
      lastName: person?.lastName,
      sex: person?.sex,
      age: person?.age,
      height: person?.height,
      weight: person?.weight,
    });
  }, [person]);

  const handleFinish = useCallback(() => {
    form
      .validateFields()
      .then((formData) => {
        if (!payload?.id) return MessageService.warn(InterfaceLabels.PERSON_ID_ERROR);
        ProfileService.changeUserById(payload?.id, formData)
          .then(() => {
            setUpdateNeeded(true);
            setOpen(false);
          })
          .catch(({ message }) => MessageService.warn(message));
      })
      .catch(() => MessageService.warn(InterfaceLabels.VALIDATION_ERROR));
  }, [form, payload]);

  return (
    <Modal
      title={InterfaceLabels.PERSON_MODAL_EDIT_TITLE}
      open={open}
      onOk={handleFinish}
      onCancel={() => setOpen(false)}
      width={'70%'}
    >
      <Form form={form} layout="vertical" labelWrap wrapperCol={{ span: 24 }}>
        <Row gutter={54} wrap>
          <Col span={12} className={styles.modalLeftCol}>
            <Item
              rules={[getRequiredRule()]}
              name="firstName"
              label={InterfaceLabels.PERSON_MODAL_EDIT_FIELD.firstName}
            >
              <Input />
            </Item>
            <Item
              rules={[getRequiredRule()]}
              name="middleName"
              label={InterfaceLabels.PERSON_MODAL_EDIT_FIELD.middleName}
            >
              <Input />
            </Item>
            <Item name="lastName" label={InterfaceLabels.PERSON_MODAL_EDIT_FIELD.lastName}>
              <Input />
            </Item>
            <Item name="sex" label={InterfaceLabels.PERSON_MODAL_EDIT_FIELD.sex}>
              <Select options={Object.keys(Sex).map((value) => ({ value, label: Sex[value as keyof typeof Sex] }))} />
            </Item>
          </Col>

          <Col span={12}>
            <Row wrap>
              <Col xs={24} sm={24} md={12} lg={8}>
                <Item
                  name="age"
                  label={InterfaceLabels.PERSON_MODAL_EDIT_FIELD.age}
                  tooltip={InterfaceLabels.PERSON_RECOMMEND_CALCULATION_POP_UP}
                >
                  <InputNumber />
                </Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={8}>
                <Item
                  name="height"
                  label={InterfaceLabels.PERSON_MODAL_EDIT_FIELD.height}
                  tooltip={InterfaceLabels.PERSON_RECOMMEND_CALCULATION_POP_UP}
                >
                  <InputNumber />
                </Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={8}>
                <Item
                  name="weight"
                  label={InterfaceLabels.PERSON_MODAL_EDIT_FIELD.weight}
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
