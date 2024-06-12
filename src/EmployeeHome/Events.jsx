const events = [
  {
    id: 1,
    title: 'Asset Allocation Meeting',
    date: '2024-07-01',
    description: 'Discussing the allocation of new assets to the employees.',
    type: 'Meeting',
  },
  {
    id: 2,
    title: 'Quarterly Asset Review',
    date: '2024-07-10',
    description: 'Review the usage and condition of returnable assets.',
    type: 'Review',
  },
  {
    id: 3,
    title: 'New Policy Implementation',
    date: '2024-07-20',
    description: 'Introduction of new policies for asset management.',
    type: 'Policy',
  },
  {
    id: 4,
    title: 'Employee Training',
    date: '2024-07-25',
    description: 'Training session for employees on how to use the asset management system.',
    type: 'Training',
  },
];

const Events = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
      <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2">
        {events.map(event => (
          <div key={event.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{event.title}</h3>
              <p className="text-sm text-gray-500">{new Date(event.date).toDateString()}</p>
              <p>{event.description}</p>
              <div className="card-actions justify-end">
                <span className={`badge ${event.type === 'Meeting' ? 'badge-info' : event.type === 'Review' ? 'badge-success' : event.type === 'Policy' ? 'badge-warning' : 'badge-primary'}`}>{event.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
