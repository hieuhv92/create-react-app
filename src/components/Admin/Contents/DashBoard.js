import './DashBoard.scss';
import { ResponsiveContainer, BarChart, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts';
import { getOverview } from '../../../services/ApiServices'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const DashBoard = (props) => {
    const [dataOverview, setDataOverview] = useState();
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchOverviewData();
    }, [])

    const fetchOverviewData = async () => {
        const res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            let QZ = 0, QS = 0, AS = 0;
            QZ = res?.DT.others?.countQuiz ?? 0;
            QS = res?.DT.others?.countQuestions ?? 0;
            AS = res?.DT.others?.countAnswers ?? 0;
            const data = [
                {
                    "name": "Quizzes",
                    "QZ": QZ

                },
                {
                    "name": "Questions",
                    "QS": QS
                },
                {
                    "name": "Answers",
                    "AS": AS
                }
            ]
            setDataChart(data);
            // toast.success('');
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="dashboard-container">
            <div className='title'>DashBoard Page</div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total Users</span>
                        <span className='text-2'>{
                            dataOverview && dataOverview.users && dataOverview.users.total ?
                                <>{dataOverview.users.total}</> : <>0</>
                        }</span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizzes</span>
                        <span className='text-2'>{
                            dataOverview && dataOverview.others && dataOverview.others.countQuiz ?
                                <>{dataOverview.others.countQuiz}</> : <>0</>
                        }</span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>{
                            dataOverview && dataOverview.others && dataOverview.others.countQuestions ?
                                <>{dataOverview.others.countQuestions}</> : <>0</>
                        }</span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>{
                            dataOverview && dataOverview.others && dataOverview.others.countAnswers ?
                                <>{dataOverview.others.countAnswers}</> : <>0</>
                        }</span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width={"95%"} height={"100%"}>
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="QZ" fill="#8884d8" />
                            <Bar dataKey="QS" fill="#82ca9d" />
                            <Bar dataKey="AS" fill="#f0d689" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;
