import { Metadata } from "next";
import JobDetailsClient from "@/components/ui/job-details-client";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getJobData(id: string) {
  try {
    const response = await fetch(`${baseUrl}/customer/jobs/id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const job = await getJobData(params.id);

  console.log(job);

  if (!job) {
    return {
      title: "Job Not Found | Marghai Dashboard",
      description: "The job you are looking for could not be found.",
    };
  }

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/jobs/${params.id}`,
    },
  };
}

const JobDetailsPage = async () => {
  return <JobDetailsClient />;
};

export default JobDetailsPage;
