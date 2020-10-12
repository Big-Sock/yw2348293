import React from 'react'
import styled from 'styled-components'

import Card from '../Card'
import CardContent from '../CardContent'
import Container from '../Container'

export interface ModalProps {
  onDismiss?: () => void,
}

const Modal: React.FC = ({ children }) => {
  return (
    <Container size="sm">
      <StyledModal>
          <Card>
            <CardContent>
              {children}
            </CardContent>
          </Card>
      </StyledModal>
    </Container>
  )
}

const StyledModal = styled.div`
border-radius: 8px;
  position: relative;
    border: solid 2px rgba(255, 183, 0, 0.3);
  background-color: rgba(256,256,256,0.08);
  z-index: 100000;
`

export default Modal