import { AlertCircle } from "lucide-react";
import Link from "next/link";

const JobNotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <div className="pt-32 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <AlertCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Job Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              {`The job you're looking for doesn't exist or has been removed.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={"/jobs"}
                className="px-8 py-3 bg-linear-to-r from-[#00cbff] to-[#0066FF] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Browse All Jobs
              </Link>
              <Link
                href={"/"}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobNotFound;
