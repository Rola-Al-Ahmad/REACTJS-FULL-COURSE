/* eslint-disable no-unused-vars */

import { useAuth } from "../context/AuthContext"
import { calculateCoffeeStats, calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getTopThreeCoffees, statusLevels } from "../utils"

function StatCard({ lg, title, children }) {
    return (
        <div className={'card stat-card  ' + (lg ? ' col-span-2' : '')}>
            <h4 className='font-bold'>{title}</h4>
            {children}
        </div>
    )
}

const Stats = () => {
    const { globalData } = useAuth()
    const stats = calculateCoffeeStats(globalData)
    console.log("stats", stats)
    // const stats = {
    //     daily_caffeine: 240,
    //     daily_cost: 6.8,
    //     average_coffees: 2.3,
    //     total_cost: 220,
    // }
    const caffeineLevel = calculateCurrentCaffeineLevel(globalData)
    const warningLevel = caffeineLevel < statusLevels['low'].maxLevel ?
        'low' :
        caffeineLevel < statusLevels['moderate'].maxLevel ?
            'moderate' :
            'high'
    return (
        <>
            <div className='section-header'>
                <i className="fa-solid fa-chart-simple" style={{ paddingTop: '2rem' }} />
                <h2 className="font-bold">Stats</h2>
            </div>
            <div className='stats-grid'>
                <StatCard lg title="Active Caffeine Level">
                    <div className="status">
                        <p><span className='stat-text'>{caffeineLevel}</span>mg</p>
                        <h5 className='font-bold' style={{ color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background, textTransform:"capitalize" }}>{warningLevel}</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>
                <StatCard title="Daily Caffeine">
                    <p><span className="stat-text">{stats.daily_caffeine}</span>mg</p>
                </StatCard>
                <StatCard title="Avg # of Coffees">
                    <p><span className="stat-text">{stats.average_coffees}</span></p>
                </StatCard>
                <StatCard title="Daily Cost ($)">
                    <p>$ <span className="stat-text">{stats.daily_cost}</span></p>
                </StatCard>
                <StatCard title="Total Cost ($)">
                    <p>$ <span className="stat-text">{stats.total_cost}</span></p>
                </StatCard>

                <table className="stat-table">
                    <thead>
                        <tr>
                            <th>Coffee Name</th>
                            <th>Number of Purchase</th>
                            <th>Percentage of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(globalData).map((coffee, coffeeIndex) => {
                            return (
                                <tr key={coffeeIndex}>
                                    <td>{coffee.coffeeName}</td>
                                    <td>{coffee.count}</td>
                                    <td>{coffee.percentage}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Stats