import { Metadata } from "next";
import JobDetailsClient from "@/components/ui/job-details-client";
import { getJobById } from "@/query/functions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const jobResponse = await getJobById(id || "123", false);

  if (!jobResponse || !jobResponse.data) {
    return {
      title: "Job Not Found | Marghai Dashboard",
      description: "The job you are looking for could not be found.",
    };
  }

  const job = jobResponse.data;

  const title = `${job.title} at ${job.company} | Marghai Dashboard`;
  const description = job.description
    ? `${job.description.substring(0, 160)}...`
    : `Apply for ${job.title} at ${job.company} in ${job.location}. ${job.type} position.`;

  return {
    title,
    description,
    keywords: [
      job.title,
      job.company,
      job.location,
      job.type,
      "jobs",
      "careers",
      "employment",
      "Afghanistan",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Marghai Dashboard",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Marghai Jobs Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/jobs/${id}`,
    },

    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
  };
}

const JobDetailsPage = async () => {
  return <JobDetailsClient />;
};

export default JobDetailsPage;
