// import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../Providers/AuthProviders";
// import { Pie } from "react-chartjs-2";
// import { Chart } from "chart.js";

// const PieChart = () => {
//     const { user } = useContext(AuthContext);
//     const [returnableCount, setReturnableCount] = useState(0);
//     const [nonReturnableCount, setNonReturnableCount] = useState(0);

//     useEffect(() => {
//         let chartInstance = null;
        
//         const fetchAssetData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:4000/requests?email=${user.email}`);
//                 const data = await response.json();
//                 const returnableAssets = data.filter(asset => asset.productType === "Returnable");
//                 const nonReturnableAssets = data.filter(asset => asset.productType === "Non-returnable");
//                 setReturnableCount(returnableAssets.length);
//                 setNonReturnableCount(nonReturnableAssets.length);
                
//                 if (chartInstance) {
//                     chartInstance.destroy();
//                 }

//                 const ctx = document.getElementById("pie-chart");
//                 chartInstance = new Chart(ctx, {
//                     type: "pie",
//                     data: {
//                         labels: ["Returnable", "Non-returnable"],
//                         datasets: [{
//                             data: [returnableCount, nonReturnableCount],
//                             backgroundColor: [
//                                 'rgba(54, 162, 235, 0.6)', 
//                                 'rgba(255, 99, 132, 0.6)', 
//                             ],
//                             borderWidth: 1,
//                         }],
//                     },
//                 });
//             } catch (error) {
//                 console.error('Error fetching asset data:', error);
//             }
//         };

//         fetchAssetData();

//         return () => {
//             if (chartInstance) {
//                 chartInstance.destroy();
//             }
//         };
//     }, [user, returnableCount, nonReturnableCount]);

//     return (
//         <div>
//             <div className="p-4 bg-fuchsia-50 pl-40">
//                 <h2 className="text-4xl font-semibold text-center">Asset Pie Chart</h2>
//                 <div className="flex justify-center mt-6">
//                     <canvas id="pie-chart" width="400" height="400"></canvas>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PieChart;
