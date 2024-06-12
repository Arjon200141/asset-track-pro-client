import { BsCalendar2DateFill } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { MdFeedback } from "react-icons/md";

const feedbackData = [
    {
        id: 1,
        employeeName: 'John Doe',
        feedback: 'Great working environment and supportive team.',
        date: '2024-06-10',
    },
    {
        id: 2,
        employeeName: 'Jane Smith',
        feedback: 'Need more flexible working hours.',
        date: '2024-06-09',
    },
    {
        id: 3,
        employeeName: 'Alice Johnson',
        feedback: 'Office snacks could be healthier.',
        date: '2024-06-08',
    },
    {
        id: 4,
        employeeName: 'Bob Brown',
        feedback: 'Would appreciate more team-building activities.',
        date: '2024-06-07',
    },
    {
        id: 5,
        employeeName: 'Chris Green',
        feedback: 'The new project management software is very effective.',
        date: '2024-06-06',
    },
    {
        id: 6,
        employeeName: 'Emily White',
        feedback: 'More parking space would be very helpful.',
        date: '2024-06-05',
    },
];

const Feedback = () => {
    return (
        <div>
            <div className=" shadow-md rounded-lg p-6">
                <h2 className="text-4xl font-semibold text-center my-8">Recent Employee Feedback and Suggestions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {feedbackData.map((item) => (
                        <div key={item.id} className="card bg-lime-50 shadow-xl">
                            <div className="card-body space-y-3">
                                <p className="flex items-center gap-3 text-lg font-medium"><FcBusinessman />{item.employeeName}</p>
                                <p className="flex items-center gap-3 text-lg font-medium"><MdFeedback />{item.feedback}</p>
                                <p className="flex items-center gap-3 text-lg font-medium"><BsCalendar2DateFill />{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feedback;
