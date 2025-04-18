/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { coffeeOptions } from '../utils'
import { useAuth } from '../context/AuthContext'
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"
import Modal from "./Modal"
import Authentication from "./Authentication"

const CoffeeForm = ({ isAuthenticated }) => {

    const [showModal, setShowModal] = useState(false)
    const [selectedCoffee, setSelectedCoffee] = useState(null)
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)
    const [coffeeCost, setCoffeeCost] = useState(0)
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)
    const [costError, setCostError] = useState('');

    const { globalData, setGlobalData, globalUser } = useAuth()

    async function handleSubmitForm() {
        // console.log(`
        //     selected coffee: ${selectedCoffee}
        //     coffee cost: ${coffeeCost}
        //     hour: ${hour}
        //     min: ${min}
        //     `
        // )

        if (!isAuthenticated) {
            setShowModal(true)
            return
        }

        // define a guard clause that only submits the form if it is completed
        if (!selectedCoffee) {
            return
        }

        try {
            // then we're going to create a new data object
            const newGlobalData = {
                ...(globalData || {})
            }

            const nowTime = Date.now()
            const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 1000)
            const timestamp = nowTime - timeToSubtract

            const newData = {
                name: selectedCoffee,
                cost: coffeeCost
            }
            newGlobalData[timestamp] = newData
            console.log(timestamp, selectedCoffee, coffeeCost)

            // update the global state
            setGlobalData(newGlobalData)

            // persist the data in the firebase firestore
            const userRef = doc(db, 'users', globalUser.uid)
            const res = await setDoc(userRef, {
                [timestamp]: newData
            }, { merge: true })

            setSelectedCoffee(null)
            setHour(0)
            setMin(0)
            setCoffeeCost(0)
        } catch (err) {
            console.log(err.message)
        }
    }
    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            <div className='section-header'>
                <i className="fa-solid fa-pencil" style={{ paddingTop: '2rem' }} />
                <h2 className='font-bold'>Start Tracking Today</h2>
            </div>
            <h4 className='font-bold'>Select coffee type</h4>
            <div className='coffee-grid'>
                {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
                    return (
                        <button onClick={() => {
                            setSelectedCoffee(option.name)
                            setShowCoffeeTypes(false)
                        }}
                            className={"button-card " + (option.name === selectedCoffee ? ' coffee-button-selected' : ' ')}
                            key={optionIndex}
                        >
                            <h4 className='font-bold'>{option.name}</h4>
                            <p>{option.caffeine} mg</p>
                        </button>
                    )
                })}
                <button className={"button-card " + (showCoffeeTypes ? ' coffee-button-selected' : ' ')}
                    onClick={() => {
                        setShowCoffeeTypes(true)
                        setSelectedCoffee(null)
                    }}
                >
                    <h4 className='font-bold'>Other</h4>
                    <p>N/A</p>
                </button>
            </div>
            {
                showCoffeeTypes && (
                    <select name="coffee-list" id="coffee-list"
                        onChange={(e) => {
                            setSelectedCoffee(e.target.value)
                        }}>
                        <option value={null}>Select type</option>
                        {
                            coffeeOptions.map((option, optionIndex) => {
                                return (
                                    <option value={option.name} key={optionIndex}>
                                        {option.name} ({option.caffeine}mg)
                                    </option>
                                )
                            })
                        }
                    </select>
                )
            }
            <h4 className='font-bold'>Add the cost ($)</h4>
            <input type="number" className='w-full' placeholder='4.50'
                onChange={(e) => {
                    if (e.target.value < 0) {
                        setCostError('Cost cannot be negative');
                        e.target.value = '';
                        return
                    }
                    if (e === '-') {
                        setCostError('Cost cannot be negative');
                        console.log('Cost cannot be negative');
                        return
                    }
                    setCoffeeCost(e.target.value)
                    setCostError('')
                }}
                onKeyDown={(e) => {
                    if (e.key === '-') {
                        e.preventDefault();
                        setCostError('Cost cannot be negative');
                        return
                    }
                }}
            />
            {
                costError && (
                    <p className='text-red-500 text-sm'>{costError}</p>
                )
            }
            <h4 className='font-bold'>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select name="hours-select" id="hours-select" onChange={(e) => { setHour(e.target.value) }}>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour, hourIndex) => {
                                return (
                                    <option key={hourIndex} value={hour}>{hour}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <h6>Mins</h6>
                    <select id="mins-select" name='mins-select' onChange={(e) => { setMin(e.target.value) }}>
                        {
                            [0, 5, 10, 15, 30, 45].map((min, minIndex) => {
                                return (
                                    <option key={minIndex} value={min}>{min}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={handleSubmitForm}>
                    <p>Add Entry</p>
                </button>
            </div>
        </>
    )
}

export default CoffeeForm