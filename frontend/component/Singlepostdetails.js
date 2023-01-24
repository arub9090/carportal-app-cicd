import React from "react";

function Singlepostdetails({ singlePost }) {
  return (
    <>
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
        <p>* This is a demo project. We will be back with more real Data *</p>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Tile
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.title}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Make
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.make}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Model
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.model}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Year
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.year}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Trim
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.trim}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Body Tyoe
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.bodytype}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Color
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.color}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Mileage
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.mileage}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                VIN
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.vin}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Condition
              </th>
              <td className="px-6 py-4">
                {singlePost && singlePost.condition}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Fuel Economy
              </th>
              <td className="px-6 py-4">
                {singlePost && singlePost.fueleconomy}
              </td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Safety Feature
              </th>
              <td className="px-6 py-4">
                {singlePost && singlePost.safetyfeature}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Location
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.city}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Country
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.country}</td>
            </tr>

            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Details
              </th>
              <td className="px-6 py-4">
                {singlePost && singlePost.description}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Price
              </th>
              <td className="px-6 py-4">{singlePost && singlePost.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Singlepostdetails;
