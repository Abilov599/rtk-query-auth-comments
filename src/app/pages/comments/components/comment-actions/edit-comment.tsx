import { EditOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useUseEditCommentMutation } from '../../../../services/comment';

interface IEditCommentProps {
  id: number;
}

function EditComment({ id }: IEditCommentProps) {
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const [edit, { isLoading }] = useUseEditCommentMutation();

  const handleOk = async () => {
    if (!commentText.trim()) {
      return;
    }

    try {
      await edit({
        id,
        body: commentText,
      }).unwrap();
      message.success(`Comment with id: ${id} edited`);
      setCommentText('');
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button shape="round" size="small" type="primary" onClick={showModal}>
        <EditOutlined />
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={handleCancel}
      >
        <Input type="text" onChange={(e) => setCommentText(e.target.value)} />
      </Modal>
    </>
  );
}

export { EditComment };
