import JobListing from "../JobListing/Components/JobListing";

export function filteredData(jobs, selected, query, filteredItems) {
  let filteredjobs = jobs?.data
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.date));
  // Filtering Input Items
  if (query) {
    filteredjobs = filteredItems;
  }

  // Applying selected filter
  if (selected) {
    filteredjobs = filteredjobs?.filter(
      ({ jobType, modeOfWork, industry, experience, title }) =>
        jobType?.description === selected ||
        modeOfWork?.description === selected ||
        industry?.description === selected ||
        experience?.description === selected ||
        title === selected
    );
  }

  return filteredjobs?.map((job) => (
    <JobListing
      key={job?._id}
      jobId={job?._id}
      title={job?.title}
      company={job?.company}
      salary={job?.salary}
      location={job?.location}
      description={job?.description}
      createdAt={job?.createdAt}
      modeOfWork={job.modeOfWork?.description}
      jobType={job?.jobType?.description}
      experience={job?.experience?.description}
    />
  ));
}
