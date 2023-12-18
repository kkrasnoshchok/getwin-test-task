import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/reducers/store'
import { fetchTypes } from '../../store/actions/data'
import { useSearchParams } from 'react-router-dom'
import styles from './TypesSelect.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { ImCross } from 'react-icons/im'

export const TypesSelect = () => {
    const dispatch = useAppDispatch()
    const { types, isLoading, error } = useAppSelector((state) => state.typesReducer)
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

    useEffect(() => {
        if (!types.length) {
            dispatch(fetchTypes())
        }
    }, [dispatch, types.length])

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
