import React, { useCallback, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'

import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'

import { getFullDisplayBalance, getSNXDisplayBalance } from '../../../utils/formatBalance'

interface DepositModalProps extends ModalProps {
  max: BigNumber,
  onConfirm: (amount: string) => void,
  tokenName?: string,
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const [done, setDone] = useState(false)

  const fullBalance = useMemo(() => {
    if (tokenName === 'SRM') {
      return getSNXDisplayBalance(max)
    }
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const confirm = useCallback((value) => {
    if (value === '') {
      value = 0
    }
    onConfirm(value)
    setDone(true)
  }, [fullBalance, setVal])

  return (
    <Modal>
      <ModalTitle text={`Deposit ${tokenName}`} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      {done ? (
        <ModalActions>
          <Button text="Close" variant="secondary" onClick={onDismiss} />
        </ModalActions>
      ) : (
          <ModalActions>
            <Button text="Cancel" variant="secondary" onClick={onDismiss} />
            <Button text="Confirm" onClick={() => confirm(val)} />
          </ModalActions>
        )}
    </Modal>
  )
}


export default DepositModal