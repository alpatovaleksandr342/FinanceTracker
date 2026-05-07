import { Modal } from '@mantine/core';
import React from 'react'
interface CreateCategoriaModalProps {
    opened: boolean;
    onClose: () => void;
}
export const CreateCategoriaModal = ({opened, onClose}:CreateCategoriaModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose}></Modal>
  )
}
