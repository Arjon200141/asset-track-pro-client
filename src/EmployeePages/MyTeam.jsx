import { useEffect, useState } from 'react';
import axios from 'axios';

const MyTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/usersemp', { timeout: 5000 }); // Set timeout example (adjust as needed)
        if (response.status === 200) {
          setMembers(response.data);
        } else {
          setError('Failed to fetch team members');
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();

    return () => {
      // Cleanup function to cancel the request if component unmounts
      const source = axios.CancelToken.source();
      return source.cancel();
    };
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4">Error: {error}</div>;
  }

  if (!Array.isArray(members) || members.length === 0) {
    return <div className="text-center py-4">No team members found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Team Members</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.map(member => (
          <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={member.photoURL || 'https://via.placeholder.com/150'} alt={member.displayName} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{member.displayName || 'Name not available'}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
