import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const MyTeamPage = () => {
  const axiosPublic = useAxiosPublic();

  const { data: employees = [], isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axiosPublic.get("/usersemp");
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching employees: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-6">My Team Members</h1>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 md:m-12">
        {employees.map((employee) => (
          <div key={employee._id} className="bg-lime-50 py-6 shadow-md rounded-lg p-4">
            <img src={employee.image || "https://i.ibb.co/Lk5XmZJ/customer-male-icon-vector-image-can-be-used-street-food-120816-251135.jpg"} alt="" className="rounded-full w-32 h-32 mx-auto mb-4" />
            <p className="text-xl font-semibold text-center">{employee.name}</p>
            <p className="text-xl text-center">{employee.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeamPage;
