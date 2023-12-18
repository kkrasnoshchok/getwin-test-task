import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './TypesSelect.module.scss'
import { ImCross } from 'react-icons/im'
import { useTypesData } from '../../utils/hooks/useTypesData'

export const TypesSelect = () => {
    const { types, isLoading, error } = useTypesData()
    const [searchParams, setSearchParams] = useSearchParams()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedType, setSelectedType] = useState(searchParams.get('type') || '')

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (type: string) => {
        setSelectedType(type)
        setSearchParams(type === '' ? [['page', '1']] : [['type', type]])
        setIsOpen(false)
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.containerTitle}>Сортувати покемонів за типом</h3>
            {isLoading && <p>Типи завантажуються...</p>}
            {error && <h1>Types Error: {error}</h1>}

            {types && !!types.length && (
                <div className={styles.selectContainer}>
                    <button onClick={handleToggle} className={styles.selectedTypeButton}>
                        <div className={styles.selectedTypeButtonLabel}>{selectedType || 'Обрати тип'}</div>
                        {selectedType && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleSelect('')
                                }}
                                className={styles.selectedTypeButtonCross}
                            >
                                <ImCross size={12} />
                            </button>
                        )}
                    </button>
                    {isOpen && (
                        <ul className={styles.typeList}>
                            <li key={'sortCancel'} onClick={() => handleSelect('')}>
                                Прибрати сортування
                            </li>
                            {types.map((type) => (
                                <li key={type.name} onClick={() => handleSelect(type.name)}>
                                    {type.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
