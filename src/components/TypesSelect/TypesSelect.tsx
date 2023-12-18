import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './TypesSelect.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
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
            <motion.h3 className={styles.containerTitle}>Знайти покемона за імʼям</motion.h3>
            <div className=""></div>
            {isLoading && <h1>Types are loading</h1>}
            {error && <h1>Types Error: {error}</h1>}

            {types && types.length && (
                <div className={styles.selectContainer}>
                    <motion.button onClick={handleToggle} className={styles.selectedTypeButton}>
                        <motion.div className={styles.selectedTypeButtonLabel}>{selectedType || 'Обрати тип'}</motion.div>
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
                    </motion.button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.ul className={styles.typeList} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <motion.li key={'sortCancel'} onClick={() => handleSelect('')} whileHover={{ scale: 1.01 }}>
                                    Прибрати сортування
                                </motion.li>
                                {types.map((type) => (
                                    <motion.li key={type.name} onClick={() => handleSelect(type.name)} whileHover={{ scale: 1.01 }}>
                                        {type.name}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}
