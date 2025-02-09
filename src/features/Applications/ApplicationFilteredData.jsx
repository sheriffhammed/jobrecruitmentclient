import ApplicationJob from "./Components/ApplicationJob";

export function ApplicationFilteredData(applications, selected, query, filteredItems) {
    let filteredApplications = applications?.data?.slice().sort((a, b) => b.createdAt.localeCompare(a.date))
    // Filtering Input Items
    if (query) {
      filteredApplications = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredApplications = filteredApplications?.filter(
        ({job }) =>
          job?.title === selected ||
          job?.location === selected 
      );
    }

    return filteredApplications?.map(
      (application) => (
       <ApplicationJob
        applicationId = {application?._id}
        title = {application?.job?.title}
        company = {application?.job?.company}
        salary = {application?.job?.salary}
        location = {application?.job?.location}
        description = {application?.job?.description}
        createdAt = {application?.createdAt}        
        />
      )
    );
  }